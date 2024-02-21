import React, { useEffect, useState } from "react";
import StudentNavBar from "./NavBar/StudentNavBar";
import ViewAdminAnncToStud from "./ViewAdminAnncToStud";

function AdminAnncToStud() {
  const [fetching, setFetching] = useState(true);
  const [adminAnnc, setAdminAncc] = useState([{}]);

  const getAdminAnnounc = async () => {
    setFetching(true);
    try {
      const list = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/student/admin-announcement`,
        {
          method: "GET",
          headers: { token: localStorage.Token },
        }
      );
      const gotList = await list.json();
      if (gotList.Status) {
        setAdminAncc([...gotList.List]);

        setTimeout(() => {
          setFetching(false);
        }, 1000);
      } else {
        setAdminAncc([]);
        setFetching(false);
        // localStorage.removeItem("Token");
        // localStorage.removeItem("User");
        // window.location.href = "/";
      }
    } catch (error) {
      alert("Something went wrong");
      setAdminAncc([]);
      setFetching(false);
      localStorage.removeItem("Token");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    getAdminAnnounc();
  }, []);
  return (
    <>
      <StudentNavBar />
      <div>
        <div className="row mt-5 pt-5">
          <div className="col-2"></div>
          <div className="col-10">
            <div>
              <h4 className="text-info text-center">Admin Announcements </h4>
            </div>
            {fetching ? (
              <div
                className="spinner-border m-5 justify-content-center"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div>
                {adminAnnc.length === 0 ? (
                  <div className="mt-3 text-center">
                    <h5 className="text-danger">No Available Announcements</h5>
                  </div>
                ) : (
                  <table className=" table  text-center text-dark">
                    <thead className="bg-dark text-light">
                      <tr>
                        <th>Date Of Announcement</th>
                        <th>Topic </th>
                        <th>View Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminAnnc.map((annc) => {
                        const { dateOfAnnouncement, topic, announcementId } =
                          annc;
                        return (
                          <tr key={announcementId}>
                            <td>{dateOfAnnouncement.slice(0, 10)}</td>
                            <td>{topic}</td>
                            <td>
                              <ViewAdminAnncToStud annc={annc} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminAnncToStud;
