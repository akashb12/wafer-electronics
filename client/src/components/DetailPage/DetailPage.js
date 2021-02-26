import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
function DetailPage(props) {
    const Id = props.match.params.id;
    const [Url, setUrl] = useState([]);
    const [oneDay, setoneDay] = useState([]);
    const [threeDays, setthreeDays] = useState("");
    const [sevenDays, setsevenDays] = useState("");
    const [thirtyDays, setthirtyDays] = useState("");

    const GoToUrl = (shortId) => {
        Axios.post("/api/shortenUrl/clickToShortUrl/" + shortId).then(
            (response) => {
                if (response.data.status) {
                    window.open(response.data.url, "_blank");
                    window.location.reload(false);
                } else {
                    alert("error");
                }
            }
        );
    };

    // single url
    useEffect(() => {
        Axios.post("/api/shortenUrl/displayUrlById/" + Id).then((response) => {
            if (response.data.status) {
                setUrl(response.data.url);
            } else {
                alert("error");
            }
        });
    }, []);

    // get data on time
    useEffect(() => {
        Axios.post("/api/shortenUrl/getUrlsOnDate/" + Id).then((response) => {
            if (response.data.status) {
                setoneDay(response.data.oneDay);
                setthreeDays(response.data.threeDays);
                setsevenDays(response.data.sevenDays);
                setthirtyDays(response.data.thirtyDays);
            } else {
                alert("error");
            }
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="column">
                    <div className="card">
                        <h3>24hrs</h3>
                        <p>{oneDay.length} users</p>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <h3>3 days</h3>
                        <p>{threeDays.length} users</p>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <h3>7 days</h3>
                        <p>{sevenDays.length} users</p>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <h3>30 days</h3>
                        <p>{thirtyDays.length} users</p>
                    </div>
                </div>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Short Url</th>
                        <th>Total Clicks</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr value={Url._id} key={Url._id}>
                        <td>{Url.shortUrl}</td>
                        <td>{Url.clicks && Url.clicks.length && Url.clicks.length}</td>
                        <td>
                            {" "}
                            <button
                                className="btn btn-danger"
                                onClick={() => GoToUrl(Url.shortUrl)}
                            >
                                Go To Url
              </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default DetailPage;
