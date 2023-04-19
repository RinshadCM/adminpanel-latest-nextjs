/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import axios from "axios";

function TeamSize({ setTeamSize, id, companyDetails }) {
  const [preferredSkills, setPreferredSkills] = useState([
    { name: "5-10", selected: false },
    { name: "10-50", selected: false },
    { name: "50-100", selected: false },
    { name: ">500", selected: false },
    { name: ">1000", selected: false },
  ]);
  const [userPreferredSkills, setUserPrefferedSkills] = useState([]);
  const [totalPreferredSkills, setTotalPreferredSkills] = useState(0);
  const [autocomplete, setAutocomplete] = useState({
    disabled: true,
    data: [],
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (companyDetails) {
      setPreferredSkills(companyDetails.teamSize);
    }
  }, [companyDetails]);

  const updatePreferredSkills = (roleNames) => {
    const arr = roleNames.split(",");
    arr.reverse();
    arr.map((roleName) => {
      let flag = 1;
      for (let i = 0; i < preferredSkills.length; i++) {
        const x = preferredSkills[i];
        if (x.name == roleName) {
          flag = 0;
          break;
        }
      }
      if (flag) preferredSkills.unshift({ name: roleName, selected: false });
    });

    var newData;

    arr.map((roleName) => {
      newData = preferredSkills.map((role) => {
        if (role.name === roleName)
          if (!role.selected && totalPreferredSkills === 7);
          else role.selected = !role.selected;

        return role;
      });
    });
    setPreferredSkills(newData);
    setTeamSize(newData);
    setInputValue("");
    setAutocomplete({
      disabled: true,
      data: [],
    });
  };

  // useEffect(() => {
  // skills.forEach((name) => updatePreferredSkills(name));
  // setUserPrefferedSkills(
  //   skills.map((name) => ({
  //     name,
  //     selected: true,
  //   }))
  // );
  // setTotalPreferredSkills(skills.length);
  // }, []);

  const handlePreferredRolesSave = async () => {
    const userSkills = preferredSkills.filter((role) => role.selected);
    const newSkills = userSkills.map((skill) => skill.name);

    try {
      await updateProfile({ skills: newSkills });
      setUserPrefferedSkills(userSkills);
      setInputValue("");
      setshowskills("");
      setAutocomplete({ disabled: true, data: [] });
    } catch (error) {
      console.log(error.response);
    }
  };

  const closePreferredRolesModal = () => {
    const rolesList = userPreferredSkills.map((role) => role.name);
    const updatedRoles = preferredSkills.map((role) => {
      if (rolesList.includes(role.name)) role.selected = true;
      else role.selected = false;
      return role;
    });
    setPreferredSkills(updatedRoles);

    setInputValue("");
    setAutocomplete({ disabled: true, data: [] });
  };

  useEffect(() => {
    let temp = 0;

    preferredSkills.forEach((role) => {
      if (role.selected) temp++;
    });
    setTotalPreferredSkills(temp);
  }, [preferredSkills]);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === "")
      setAutocomplete({ disabled: true, data: [] });
    else {
      const autocompleteData = [];
      const regex = new RegExp(e.target.value, "i");

      preferredSkills.forEach((role) => {
        if (regex.test(role.name)) autocompleteData.push(role.name);
      });

      setAutocomplete({
        disabled: false,
        data: [e.target.value, ...autocompleteData],
      });
    }
  };
  return (
    <div>
      {/* CONTENT START */}

      <div className="relative flex-auto">
        <input
          className="appearance-none px-3 py-2 mt-[7px] mb-[7px] placeholder-[#6B7280] text-[#030303]  placeholder-opacity-90 relative w-full bg-white rounded text-sm border-[1.5px]  focus:outline-none focus:border-[#2dc5a1] focus:border-2 transition duration-200  ease-in bg-transparent"
          type="number"
          min={0}
          value={inputValue}
          onChange={handleInputValueChange}
          placeholder="Example:5-10 , 10-50 "
        />
        {/* <div
          className={`${autocomplete.disabled ? 'hidden' : ''
            } ml-[0.5rem] w-[90%] absolute z-10 border rounded-md  py-1 bg-white
            max-h-60 overflow-y-scroll`}
        >
          {autocomplete.data.map((item, index) => (
            <div
              key={index}
              className="px-3 mt-1 h-10 flex items-center cursor-pointer 
              font-medium text-sm hover:bg-gray-100"
              onClick={() => updatePreferredSkills(item)}
            >
              {item}
            </div>
          ))}
        </div> */}
      </div>
      {/* <div className="ml-1">
        <div className="w-full ml-[-10px]">
          {preferredSkills.map((role, index) => (
            <span
              key={index}
              className="preferred_roles"
              style={{
                background: role.selected ? '#61a0ff' : '',
                color: role.selected ? '#fff' : '',
              }}
              onClick={() => updatePreferredSkills(role.name)}
            >
              {role.name}
            </span>
          ))}
        </div>
      </div> */}
    </div>

    //   {/* CONTENT END */}
  );
}

export default TeamSize;
