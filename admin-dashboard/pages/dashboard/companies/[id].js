import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CompanyHeader from "../../../components/CompanyHeader";
import Jobs from "../../../components/CompanySections/Jobs";
import KeyPeople from "../../../components/CompanySections/KeyPeople";
import Profile from "../../../components/CompanySections/Profile";
import Sidebar from "../../../components/Sidebar/Sidebar";
import axios from "axios";

function Company() {
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  const [currentSection, setCurrentSection] = useState("Profile");
  const [companyDetails, setCompanyDetails] = useState();

  useEffect(async () => {
    if (router.isReady) {
      console.log(id);
      await axios({
        method: "get",
        // withCredentials: true,
        url: `http://localhost:3001/get-company/?_id=${id}`,
      }).then((data) => {
        setCompanyDetails(data.data);
      });
    }
  }, [router.isReady, id]);

  return (
    <div>
      <Sidebar />
      <div className="main">
        <div className="min-h-screen pb-[20px] bg-[#f8f8f8]">
          <CompanyHeader id={id} companyDetails={companyDetails} />

          {/* <ul className="flex justify-between w-full px-20 text-lg pt-5 border-b">
            <li
              onClick={() => setCurrentSection("Profile")}
              className={`current-section-option ${
                currentSection === "Profile" && "border-b-2 border-[#2dc5a1]"
              }`}
            >
              Profile
            </li>
            <li
              onClick={() => setCurrentSection("Jobs")}
              className={`current-section-option ${
                currentSection === "Jobs" && "border-b-2 border-[#2dc5a1]"
              }`}
            >
              Jobs
            </li>
            <li
              onClick={() => setCurrentSection("KeyPeople")}
              className={`current-section-option ${
                currentSection === "KeyPeople" && "border-b-2 border-[#2dc5a1]"
              }`}
            >
              Key People
            </li>
          </ul> */}

          {/* {currentSection === "Profile" ? (
            <Profile id={id} companyDetails={companyDetails} />
          ) : currentSection === "Jobs" ? (
            <Jobs id={id} companyDetails={companyDetails} />
          ) : (
            <KeyPeople id={id} companyDetails={companyDetails} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Company;
