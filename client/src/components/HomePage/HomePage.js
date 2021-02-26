import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
function HomePage() {
    const [Value, setValue] = useState("");
    const [Url, setUrl] = useState([]);
    const onValueChange = (event) => {
        setValue(event.currentTarget.value);
    };

    // get all urls
    useEffect(() => {
        Axios.post("/api/shortenUrl/displayShortUrls").then((response) => {
            if (response.data.status) {
                setUrl(response.data.urls);
            } else {
                alert("error");
            }
        });
    }, []);

    //   inserting all urls in table
    const urls = Url.map((url, index) => {
        return (
            <tr value={url._id} key={url._id}>
                <td>{index + 1}</td>
                <td>{url.shortUrl}</td>
                <td>{url.clicks.length}</td>
                <td>
                    {url.enabled ? (
                        <button
                            className="btn btn-danger"
                            onClick={() => Visibility(url.shortUrl)}
                        >
                            Disable
                        </button>
                    ) : (
                            <button
                                className="btn btn-danger"
                                onClick={() => Visibility(url.shortUrl)}
                            >
                                Enable
                            </button>
                        )}
                </td>
                {url.enabled ? (
                    <td>
                        <Link to={"/details/" + url.shortUrl}>View</Link>
                    </td>
                ) : (
                        <td>N/A</td>
                    )}
            </tr>
        );
    });
    // enable disable url
    const Visibility = (shortUrl) => {
        console.log(shortUrl);
        Axios.post("/api/shortenUrl/urlVisibility", { shortUrl: shortUrl }).then(
            (response) => {
                if (response.data.status) {
                    alert(response.data.message);
                    window.location.reload(false);
                } else {
                    alert("error");
                }
            }
        );
    };

    // submiting url
    const onSubmit = (event) => {
        event.preventDefault();
        if (!Value) {
            alert("url empty");
        }
        const variables = {
            fullUrl: Value,
        };
        Axios.post("/api/shortenUrl/createShortUrls", variables).then(
            (response) => {
                if (response.data.status) {
                    alert(response.data.message);
                    window.location.reload(false);
                } else if (!response.data.status && response.data.error) {
                    alert(response.data.error);
                    window.location.reload(false);
                } else {
                    alert("error");
                }
            }
        );
    };

    return (
        <div>
            <div className="container">
                <h1>URL Shrinker</h1>
                <form className="my-4 form-inline" onSubmit={onSubmit}>
                    <label for="fullUrl" className="sr-only">
                        Url
          </label>
                    <input
                        required
                        placeholder="Url"
                        type="url"
                        name="fullUrl"
                        id="fullUrl"
                        onChange={onValueChange}
                        value={Value}
                        className="form-control col mr-2"
                    />
                    <button className="btn btn-success" onClick={onSubmit}>
                        Add
          </button>
                </form>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Short Url</th>
                            <th>Total Clicks</th>
                            <th>Visibility</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>{urls}</tbody>
                </Table>
            </div>
        </div>
    );
}

export default HomePage;
