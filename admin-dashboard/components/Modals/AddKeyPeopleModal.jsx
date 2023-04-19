import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { AiFillCheckCircle } from "react-icons/ai";

function AddKeyPeopleModal({
    showAddKeyPeopleModal,
    setShowAddKeyPeopleModal,
    curItem,
    setCurItem,
    isEdit,
    people,
    setPeople,
    index,
    companyDetails,
}) {

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [alternateEmail, setAlternateEmail] = useState("");
    const [password, setPassword] = useState("");

    // load company details
    useEffect(() => {
        if (curItem) {
            setName(curItem.name);
            setRole(curItem.role);
            setEmail(curItem.email);
            setAlternateEmail(curItem.alternateEmail);
            setPassword(curItem.password);
        }
    }, [companyDetails, curItem, isEdit]);

    const handleSaveJobClick = async () => {

        if (name === "") {
            notify("Name is required");
            return;
        }
        if (role === "") {
            notify("Role is required");
            return;
        }
        if (email === "") {
            notify("Email is required");
            return;
        }
        if (isEdit) {
            const data = {
                name,
                role,
                email,
                alternateEmail,
                password,
            };

            // match curItem._is wwith companyDetails.keyPeople[index]._id and upadate the data
            companyDetails.keyPeople.map((keyPerson, index) => {
                if (keyPerson._id === curItem._id) {
                    companyDetails.keyPeople[index] = data;
                }
            });

            const response = await axios({
                method: "PUT",
                url: `http://localhost:3001/update-company/?_id=${companyDetails._id}`,
                data: companyDetails,
            });

            if (response.status === 200) {
                notify(message)
                setPeople(companyDetails.keyPeople);
                setShowAddKeyPeopleModal(false);
            }
            else {
                notify("Something went wrong");
            }

        } else {
            const data = {
                name,
                role,
                email,
                alternateEmail,
                password,
            };

            companyDetails.keyPeople.push(data);

            const response = await axios({
                method: "PUT",
                url: `http://localhost:3001/update-company/?_id=${companyDetails._id}`,
                data: companyDetails,
            });

            if (response.status === 200) {
                notify(message)
                setPeople(companyDetails.keyPeople);
                setShowAddKeyPeopleModal(false);
            }
            else {
                notify("Something went wrong");
            }
        }
    }

    const handleClose = (e) => {
        if (e.target.id === "container") {
            setShowAddKeyPeopleModal(false);
        }
    };

    const handleDeleteJobClick = async () => {

        companyDetails.keyPeople.splice(index, 1);

        const response = await axios({
            method: "PUT",
            url: `http://localhost:3001/update-company/?_id=${companyDetails._id}`,
            data: companyDetails,
        });

        if (response.status === 200) {
            notify(message)
            setPeople(companyDetails.keyPeople);
            setShowAddKeyPeopleModal(false);
        }
        else {
            notify("Something went wrong");
        }
    }

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

    const notify = (message) =>
        toast(message, {
            position: "bottom-center",
            style: {
                width: "fit-content",
                borderRadius: "9999px",
                fontFamily: "Inter",
                backgroundColor: "black",
                color: "white",
            },
        });

    return (
        <div>
            {showAddKeyPeopleModal ? (
                <>
                    <div
                        id="container"
                        onClick={handleClose}
                        className="bg-black bg-opacity-70 w-full h-full fixed z-50 inset-0 flex items-center justify-center edit-overlay"
                    >
                        <div className="relative max-h-[784px] flex-col h-[94%] rounded-lg w-[37.5rem] overflow-y-auto bg-white z-10 text-black">
                            <div className="top-0 sticky z-50 flex items-center justify-between p-5 bg-[#eff2f6] py-[9px] px-6 rounded-t-lg max-h-[60px] rounded-b-sm my-auto h-[200px]">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    aria-label="Close modal"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute top-5 right-5 w-[32px] h-[32px] pt-0 z-50 text-[#808080] cursor-pointer"
                                    onClick={() => setShowAddKeyPeopleModal(false)}
                                >
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                                <h3 className="text-[0.875rem] leading-5 font-semibold m-0">
                                    {isEdit ? "Edit Key Person" : "Add Key Person"}
                                </h3>
                            </div>

                            <div className="px-10 w-full  mt-[10px]">
                                <div className="w-full mt-[15px]">
                                    <p className="text-[15px] font-semibold text-[#201e27]">
                                        Name
                                    </p>
                                    <input
                                        type="text"
                                        defaultValue={curItem.name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Smith"
                                        className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
                                    />
                                </div>
                                <div className="w-full mt-[15px]">
                                    <p className="text-[15px] font-semibold text-[#201e27]">
                                        Role
                                    </p>
                                    <input
                                        type="text"
                                        defaultValue={curItem.role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="HR Manager"
                                        className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
                                    />
                                </div>
                                <div className="w-full mt-[15px]">
                                    <p className="text-[15px] font-semibold text-[#201e27]">
                                        Email ID
                                    </p>
                                    <input
                                        type="text"
                                        defaultValue={curItem.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@company.me"
                                        className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
                                    />
                                </div>
                                <div className="w-full mt-[15px]">
                                    <p className="text-[15px] font-semibold text-[#201e27]">
                                        Alternate Email ID
                                    </p>
                                    <input
                                        type="text"
                                        defaultValue={curItem.alternateEmail}
                                        onChange={(e) => setAlternateEmail(e.target.value)}
                                        placeholder="example@example.com"
                                        className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
                                    />
                                </div>

                                <div className="w-full mt-[15px]">
                                    <p className="text-[15px] font-semibold text-[#201e27]">
                                        LinkedIn Profile
                                    </p>
                                    <input
                                        type="text"
                                        defaultValue={curItem.password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="https://www.password.com/..."
                                        className="appearance-none px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in mt-1 bg-transparent"
                                    />
                                </div>
                            </div>
                            <hr />
                            <button
                                className="save-button float-right m-[20px] py-[10px] "
                                onClick={() => {
                                    handleSaveJobClick();
                                }}
                            >
                                Save
                            </button>
                            {isEdit && <button
                                className="delete-button float-left m-[20px] py-[10px]"
                                onClick={() => {
                                    handleDeleteJobClick();
                                }} >Delete</button>}
                        </div>
                        <Toaster />
                    </div>
                </>
            ) : null
            }
        </div >
    );
}

export default AddKeyPeopleModal;
