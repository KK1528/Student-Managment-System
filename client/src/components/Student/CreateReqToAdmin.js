import React, { useState } from "react";
import StudentNavBar from "./NavBar/StudentNavBar";

function CreateReqToAdmin() {
  const [fetching, setFetching] = useState(false);
  const [added, setAdded] = useState(false);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const handleClick = () => {
    setAdded(false);
    setTopic("");
    setContent("");
    setFetching(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);
    const body = { topic, content };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/student/admin-request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.Token,
            id: localStorage.id,
          },
          body: JSON.stringify(body),
        }
      );
      const res = await response.json();
      if (res.Status) {
        setFetching(false);
        setAdded(true);
      } else {
        alert("Something Went Wrong");
      }
    } catch (error) {
      alert(
        `Something Went Wrong, I'm in the Catch block of Try And Catch, ${error.message}`
      );
    }
  };

  return (
    <>
      <StudentNavBar />

      <div className="row">
        <div className="col-2"></div>
        <div className="col-10">
          <div className="row content-justify-center">
            <div className="col-2"></div>
            <div className="col-7">
              {added ? (
                <>
                  <h5 className="text-center text-success mt-3 pt-4 mb-3">
                    The Following Request Was Raised To the Admin
                  </h5>

                  <div className="form-outline mb-4">
                    <label>Topic</label>
                    <input
                      disabled
                      type="text"
                      className="form-control bg-light"
                      required
                      autoComplete="off"
                      value={topic}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label>Content</label>
                    <textarea
                      disabled
                      className="form-control bg-light"
                      id="exampleFormControlTextarea1"
                      rows="10"
                      value={content}
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-block mb-4 mt-2"
                    onClick={handleClick}
                  >
                    Add More?
                  </button>
                </>
              ) : (
                <>
                  <h5 className="text-center text-info mt-5 pt-5 mb-2">
                    Enter Details Of The Request
                  </h5>
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <div className="form-outline mb-4">
                      <label>Topic</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        required
                        autoComplete="off"
                        onChange={(e) => {
                          setTopic(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label>Content</label>
                      <textarea
                        required
                        className="form-control bg-light"
                        id="exampleFormControlTextarea1"
                        rows="10"
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    {fetching ? (
                      <button
                        className="btn btn-primary btn-block mb-4 mt-2"
                        type="button"
                        disabled
                      >
                        Creating...{" "}
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4 mt-2"
                      >
                        Create
                      </button>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateReqToAdmin;
