import { useState, useEffect } from "react";
import AddJobModal from "../Modals/AddJobModal";
import AddKeyPeopleModal from "../Modals/AddKeyPeopleModal";
import parse from "html-react-parser";

function KeyPeople({ id, companyDetails }) {
  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState();
  const [showAddKeyPeopleModal, setShowAddKeyPeopleModal] = useState(false);
  const [keyPeople, setKeyPeople] = useState([]);
  const [curKeyPerson, setCurKeyPerson] = useState({});

  useEffect(() => {
    if (
      companyDetails &&
      companyDetails.keyPeople &&
      companyDetails.keyPeople.length > 0
    ) {
      setKeyPeople(companyDetails.keyPeople);
      setIndex(companyDetails.keyPeople.length);
    }
  }, [companyDetails]);

  const handleJobClick = (keyPerson, index) => {
    setCurKeyPerson(keyPerson);
    setIsEdit(true);
    setIndex(index);
    setShowAddKeyPeopleModal(true);
  };

  const handleSaveJobClick = () => {
    setCurKeyPerson({
      name: "",
      role: "",
      email: "",
      alternateEmail: "",
      password: "",
    });
    setIsEdit(false);
    setShowAddKeyPeopleModal(true);
  };

  return (
    <div className="px-20">
      <button
        className="save-button float-right m-[20px] "
        onClick={handleSaveJobClick}
      >
        Add Person
      </button>
      <AddKeyPeopleModal
        showAddKeyPeopleModal={showAddKeyPeopleModal}
        setShowAddKeyPeopleModal={setShowAddKeyPeopleModal}
        people={keyPeople}
        setPeople={setKeyPeople}
        curItem={curKeyPerson}
        setCurItem={setCurKeyPerson}
        isEdit={isEdit}
        index={index}
        companyDetails={companyDetails}
      />

      <div className="w-[80%] flex flex-row-rev flex-wrap ">
        {keyPeople.map((person, index) => {
          return (
            <div
              key={person._id}
              className="cursor-pointer m-[15px]"
              onClick={() => handleJobClick(person, index)}
            >
              <h1>{person.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KeyPeople;

// const PeopleForm = ({
//   setPeople,
//   people,
//   index,
//   personDetails,
//   handleDeleteClick,
//   handleAddClick,
// }) => {
//   //   const handleDeleteClick = (index) => {};
//   console.log(personDetails);

//   return (
//     <>
//       <div className="w-full flex justify-between">
//         <input
//           type="text"
//           value={personDetails.name}
//           placeholder="Name"
//           className=" placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
//         />
//         <input
//           type="text"
//           value={personDetails.role}
//           placeholder="Role"
//           className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
//         />
//         <input
//           type="text"
//           value={personDetails.email}
//           placeholder="Email"
//           className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
//         />
//         <input
//           type="text"
//           value={personDetails.alternateEmail}
//           placeholder="Alternate Email"
//           className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
//         />
//         <input
//           type="text"
//           value={personDetails.password}
//           placeholder="LinkedIn"
//           className="px-3 py-2 placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2  w-[18%]  transition duration-200 ease-in"
//         />

//         {/* <div
//           className="cursor-pointer flex items-center justify-center"
//           onClick={() => handleAddClick(index)}
//         >
//           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAY0lEQVRIie3TwQmAMBBE0Q92YB1e9RQw2H8hahVeNp6MiJnc5hfwArMEnGttEFoLMAKn0LzLwBGPyEuBb8Zl+MT7scpB8x+cwGtAM156mkC+eQL2ALsddA1YMkutmU4/1LlvXcG2FRsgGwMmAAAAAElFTkSuQmCC" />
//         </div> */}

//         <div
//           className="cursor-pointer flex items-center justify-center"
//           onClick={() => handleDeleteClick(index)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             x="0px"
//             y="0px"
//             width="30"
//             height="30"
//             viewBox="0 0 30 30"
//             style=" fill:#000000;"
//           >
//             <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
//           </svg>
//         </div>
//       </div>
//     </>
//   );
// };
