import React, { useRef, useState, useEffect } from "react";
import AddJobModal from "../Modals/AddJobModal";
import RichEditor from "../General/Editor";

function Jobs({ id, companyDetails }) {
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [curItem, setCurItem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState();
  const [aboutCompany, setAboutCompany] = useState("");
  const handleEditorChange = (htmlContent) => {
    setAboutCompany(htmlContent);
  };

  useEffect(() => {
    if (companyDetails)
      if (companyDetails.jobs && companyDetails.jobs.length > 0) {
        setJobs(companyDetails.jobs);
        setIndex(companyDetails.jobs.length);
      }
    setAboutCompany(companyDetails.about);
  }, [companyDetails]);

  const handleJobClick = (job, index) => {
    setCurItem(job);
    setIsEdit(true);
    setIndex(index);
    setShowAddJobModal(true);
    setIsEdit(true);
  };

  const handleSaveJobClick = () => {
    setCurItem({
      title: "",
      jobType: "",
      description: "",
      responsibilities: "",
    });
    setIsEdit(false);
    setShowAddJobModal(true);
  };

  return (
    <div className="jobs">
      <div className="px-20 ">
        <button
          className="save-button float-right m-[20px] "
          onClick={handleSaveJobClick}
        >
          Add Job
        </button>
        <AddJobModal
          showAddJobModal={showAddJobModal}
          setShowAddJobModal={setShowAddJobModal}
          jobs={jobs}
          setJobs={setJobs}
          curItem={curItem}
          isEdit={isEdit}
          index={index}
          companyDetails={companyDetails}
        />

        <div className="w-[80%] flex flex-row-rev flex-wrap ">
          {jobs.map((job, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer m-[15px]"
                onClick={() => handleJobClick(job, index)}
              >
                <h1>{job.title}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
