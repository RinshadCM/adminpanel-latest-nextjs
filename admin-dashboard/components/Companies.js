import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";

function Companies() {
  const [userList, setuserList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/get-companies",
    }).then((data) => {
      setuserList(data.data);
    });
  }, []);

  // console.log(companyDetails);

  return (
    <div className="main">
      <div className="min-h-screen pb-[20px] bg-[#f8f8f8]">
        {/* top */}
        <div className="w-full h-[133px] bg-white flex flex-col items-center justify-center"></div>
        <Modal
          userList={userList}
          setuserList={setuserList}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
        {/* bottom */}
        <div className="text-[#033443] max-w-[968px] mx-auto pt-5 my-0">
          <div>
            <div className="flex justify-end">
              {/* <input
                type="text"
                placeholder="Search Company Name"
                className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded-md text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 w-56 transition duration-200 ease-in mr-8"
              />
              <input
                type="text"
                placeholder="Search Company Location"
                className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded-md text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 w-56 transition duration-200 ease-in mr-8"
              /> */}
              <button
                className="bg-collabi-green px-2 text-white h-9 w-32 rounded-md text-sm font-medium"
                onClick={() => setModalOpen(true)}
              >
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* companies */}
        <div className="columns-1 mx-5 p-5">
          {userList.map((element) => (
            <Link
              key={element._id}
              href={`/dashboard/companies/${element._id}`}
              passHref
            >
              <p className="cursor-pointer">{element.email}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies;
