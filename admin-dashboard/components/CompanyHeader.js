import { AiFillCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Router from "next/router";

function CompanyHeader({ id, companyDetails }) {
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

  const notify = () => {
    toast(message, {
      position: "bottom-center",
      style: {
        width: "fit-content",
        borderRadius: "9999px",
        fontFamily: "Inter",
        backgroundColor: "black",
      },
    });
  };
  const fileRef = useRef(null);

  // const [companyDetails, setCompanyDetails] = useState();
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [roles, setRoles] = useState("");
  // const [companyLogo, setCompanyLogo] = useState("");
  // const [companyTagline, setCompanyTagline] = useState("");
  // const [featured, setFeatured] = useState(false);

  // useEffect(async () => {
  //   if (id) {
  //     await axios({
  //       method: "get",
  //       // withCredentials: true,
  //       url: `https://hirable-backend-original.vercel.app/get-companies/?_id=${id}`,
  //     }).then((data) => {
  //       setCompanyDetails(data.data);
  //       setuserEmail(data.data.title);
  //       setPassword(data.data.password);
  //       setCompanyLogo(data.data.image);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (companyDetails) {
      setuserEmail(companyDetails.email);
      setPassword(companyDetails.password);
      setFname(companyDetails.fname);
      setLname(companyDetails.lname);
      setRoles(companyDetails.roles);
      // setCompanyLogo(companyDetails.image);
      // setCompanyTagline(companyDetails.tagline);
      // setFeatured(companyDetails.featured);
    }
    console.log(companyDetails);
  }, [companyDetails]);

  const [userList, setuserList] = useState([]);

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     withCredentials: true,
  //     url: "http://localhost:3001/get-companies",
  //   }).then((data) => {
  //     setuserList(data.data);
  //     console.log(data.data);
  //   });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const company = {
    //   userEmail,
    //   password,
    //   companyLogo,
    // };

    await axios({
      method: "put",
      data: {
        email: userEmail,
        password: password,
        // image: companyLogo,
        // tagline: companyTagline,
        // featured: featured,
        subtitle: companyDetails.subtitle,
        description: companyDetails.description,
        fname: fname,
        jobs: companyDetails.jobs,
        locations: companyDetails.locations,
        tags: companyDetails.tags,
        keyPeople: companyDetails.keyPeople,
        teamSize: companyDetails.teamSize,
        facebook: companyDetails.facebook,
        lname: lname,
        roles: roles,
        numberOfOpenings: companyDetails.numberOfOpenings,
        image: companyDetails.image,
      },
      // withCredentials: true,
      url: `http://localhost:3001/update-company/?_id=${id}`,
    });

    // setuserList((userList) => [...userList, company]);
    // setuserEmail("");
    // setPassword("");
    // setCompanyLogo(null);
    // setModalOpen(false);
  };

  const handleDelete = async (e) => {
    notify();

    await axios({
      method: "delete",
      // withCredentials: true,
      url: `http://localhost:3001/delete-company/${id}`,
    });

    Router.push("/dashboard/companies");
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
  return (
    <div className="w-full bg-white flex flex-col justify-center px-20 pt-10">
      <form className="p-6" onSubmit={handleSubmit}>
        <div className="flex w-full items-center">
          <div className="mr-8">
            {/* <div
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
            </div> */}
          </div>
          <div className="flex flex-col space-y-6 flex-1">
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter User Mail Address"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
                className="px-3 py-2 placeholder-[#6B7280] text-[#030303] placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px] focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full transition duration-200 ease-in"
              />
            </div>
            <div className="flex w-full h-1/4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
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
            <div className="px-10 w-full space-y-2">
              <p className="text-[12px] font-semibold text-[#201e27]">Role</p>
              <div className="relative">
                <select
                  defaultValue="Admin"
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
            {/* <div className="flex w-full h-1/4">
              <input
                type="text"
                value={companyTagline}
                onChange={(e) => setCompanyTagline(e.target.value)}
                placeholder="Enter your Company's Tagline"
                className="px-1 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white text-sm border rounded-tr-[3.5px] rounded-br-[3.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-full  transition duration-200 ease-in"
              />
            </div> */}
            {/* <div className="flex w-full h-1/4">
              <input
                type="checkbox"
                name="isfeatured"
                id="isfeatured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <label className="font-inter text-sm ml-2" htmlFor="">
                Featured
              </label>
            </div> */}
          </div>
        </div>
        <input type="file" ref={fileRef} hidden onChange={handleFileChange} />
        <div className="flex justify-between w-full mt-[1.5rem]">
          <div className="flex items-center  justify-between">
            {/* <button
              className="save-button mr-8"
              onClick={() => fileRef.current.click()}
            >
              Edit
            </button> */}
            <button
              className="delete-button"
              // onClick={() => fileRef.current.click()}
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
          <button
            onClick={() => notify()}
            className="save-button"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default CompanyHeader;
