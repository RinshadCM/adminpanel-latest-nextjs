import { GrClose } from "react-icons/gr";
import { useRef, useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AiFillCheckCircle } from "react-icons/ai";
import Router from "next/router";

function Modal({ modalOpen, userList, setuserList, setModalOpen, companyDetails }) {
  const message = () => {
    return (
      <div className="flex items-center justify-betwen">
        <div className="text-white">
          <AiFillCheckCircle />
        </div>
        <div className=" ml-2 font-inter text-white text-[14px] ">
          Details saved successfully!
        </div>
      </div>
    );
  };

  const notify = () =>
    toast(message, {
      position: "bottom-center",
      style: {
        width: "fit-content",
        borderRadius: "9999px",
        fontFamily: "Inter",
        backgroundColor: "black",
      },
    });

  const fileRef = useRef(null);

  const [userEmail, setuserEmail] = useState("");
  const [pass, setPass] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  const [facebook, setFacebook] = useState("");
  const [activecheck, setActivecheck] = useState(true);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [openings, setOpenings] = useState("");
  const [location, setLocation] = useState();
  const [tags, setTags] = useState();
  const [teamSize, setTeamSize] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [roles, setRoles] = useState("Admin");
  const [companyDescription, setCompanyDescription] = useState("");

  useEffect(() => {
    if (companyDetails) {
      setFacebook(companyDetails.facebook);
      setFname(companyDetails.link);
      setLname(companyDetails.lname);
      setActivecheck(companyDetails.activecheck);
      setOpenings(companyDetails.numberOfOpenings);
      setLocation(companyDetails.locations);
      setTags(companyDetails.tags);
      setTeamSize(companyDetails.teamSize);
      setAboutCompany(companyDetails.about);
      setRoles(companyDetails.totalFunding);
      setCompanyDescription(companyDetails.description);
    }
  }, [companyDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const company = {
      userEmail,
      pass,
      activecheck,
      fname,
      lname,
      companyLogo,
    };

    const response = await axios({
      method: "post",
      data: {
        email: userEmail,
        password: pass,
        fname: fname,
        lname: lname,
        activecheck: activecheck,
        image: companyLogo,
        roles: roles
      },
      // withCredentials: true,
      url: "http://localhost:3001/create-company",
    });

    // if (response.status === 201) {
    //   Router.push(
    //     "/dashboard/companies/[id]",
    //     `/dashboard/companies/${response.data._id}`
    //   );
    // }

    setuserList((userList) => [...userList, response.data]);
    setuserEmail("");
    setPass("");
    setFname("");
    setLname("");
    setActivecheck(false);
    setRoles("");
    setCompanyLogo(null);
    setModalOpen(false);
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setCompanyLogo(readerEvent.target.result);
    };
  };
  const removeImage = () => {
    setCompanyLogo(null);
  };

  const handleClose = (e) => {
    if (e.target.id === "container") {
      setModalOpen(false);
    }
  };
  return (
    <div
      id="container"
      onClick={handleClose}
      className={`${!modalOpen ? "hidden" : "fixed"
        } top-0 left-0 z-50 overflow-auto bg-smoke-light flex w-[100vw] h-[100vh]`}
    >
      <div className="relative bg-white m-auto flex rounded-lg flex-col">
        <div className="bg-[#eff2f6] flex justify-between p-6 rounded-t-lg">
          <p className="text-[0.875rem] leading-5 font-semibold m-0">
            Add User
          </p>
          <GrClose
            className="w-5 h-5 pt-0 z-50 text-[#808080] cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="flex w-full items-center">
            {/* <div className="mr-8">
              <p className="text-[12px] font-semibold p-1 mt-1">Company Logo</p>
              <div
                className="h-28 w-28 border-dotted border-2 border-gray-300 bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={() => fileRef.current.click()}
              >
                {companyLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={companyLogo}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-[2.5rem] text-gray-500">
                    <AiOutlinePlus />
                  </span>
                )}
              </div>
            </div> */}
            <div className="flex flex-col space-y-6">
              <div className="w-full">
                <p className="text-[12px] font-semibold p-1 mt-1">
                  Email
                </p>
                <input
                  type="text"
                  placeholder="Email Address"
                  value={userEmail}
                  onChange={(e) => setuserEmail(e.target.value)}
                  className="px-3 py-2 placeholder-[#6B7280] text-[#030303] placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px] focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full transition duration-200 ease-in"
                />
              </div>
              <div className="flex w-full h-1/4">
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="*******"
                  className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
                />
              </div>
              <div className="flex w-full h-1/4">
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="First Name"
                  className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
                />
              </div>
              <div className="flex w-full h-1/4">
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  placeholder="Last Name"
                  className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
                />
              </div>
              {/* <div className="flex w-full h-1/4">
                <label className="font-inter text-sm ml-2" htmlFor="">
                  Active
                </label>
                <input
                  type="checkbox"
                  value="true"
                  onChange={(e) => setActivecheck(e.target.value)}
                  className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
                />
              </div> */}
              <div className="px-10 w-full space-y-2">
                <p className="text-[12px] font-semibold text-[#201e27]">Role</p>
                <div className="relative">
                  <select
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                    className="block appearance-none w-full bg-white border-[1.5px] border-gray-300 rounded-md py-2 px-3 text-sm leading-tight focus:outline-none focus:border-green-500 focus:ring-green-500 transition duration-200 ease-in mt-1"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Author">Author</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-4 w-4 fill-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.05 12.05a1 1 0 011.41 0L10 15.09l3.54-3.54a1 1 0 111.41 1.41l-4.24 4.24a1 1 0 01-1.41 0l-4.24-4.24a1 1 0 010-1.41z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>



            </div>
          </div>
          <input type="file" ref={fileRef} hidden onChange={handleFileChange} />
          <div className="float-right ml-[0.75rem] mt-[1.5rem]">
            <button
              onClick={() => {
                notify();
                setTimeout(() => {
                  setModalOpen(false);
                }, 2000);
              }}
              className="ml-[0.9375rem]  outline-none  min-w-[9.0625rem] py-[0.625rem] px-[0.75rem] rounded-[0.3125rem]  font-semibold text-[0.875rem] h-[2.5rem] cursor-pointer text-white bg-[#1a73e8] mb-[20px]  border-none mt-[10px] flex items-center justify-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Modal;
