"use client";
import React, { useState, useEffect, useRef, useId } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiEdit } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteForever } from "react-icons/md";

const Manager = () => {
  const [seePass, setseePass] = useState(false);
  const [form, setform] = useState({ site: "", name: "", pass: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [dataArray, setdataArray] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("data");
    if (data) {
      setdataArray(JSON.parse(data));
    }
  }, []);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePass = () => {
    if (form.site.length > 3 && form.name.length > 3 && form.pass.length > 6) {
      setdataArray([...dataArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "data",
        JSON.stringify([...dataArray, { ...form, id: uuidv4() }])
      );
      console.log(dataArray);
      setform({ site: "", name: "", pass: "" });
      toast("Password Saved successfully");
    } else {
      alert(
        `Your Password ${form.pass} Lenght is ${form.pass.length} \n Your Name ${form.name} Lenght is ${form.name.length} \n Your Site ${form.site} Lenght is ${form.site.length} \n Minimum Requirement is: Password Lenght > 6 \n Name Lenght > 3 \n Site Lenght > 3 `
      );
    }
  };
  const deletePass = (id) => {
    if (confirm("Do you want to delete this!")) {
      setdataArray(dataArray.filter((item) => item.id != id));
      localStorage.setItem(
        "data",
        JSON.stringify(dataArray.filter((item) => item.id != id))
      );
    }
  };
  const editPass = (id) => {
    if (confirm("Do you want to Edit this!")) {
      console.log(id);
      setform(dataArray.filter((i) => i.id === id)[0]);
      setdataArray(dataArray.filter((item) => item.id != id));
    }
  };
  const showpass = () => setseePass(!seePass);

  const copyText = (text) => {
    toast("Copied to Clipboard");
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="container my-container">
        <h1 className=" text-4xl text-center font-bold">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your Own Password Manager
        </p>
        <div className="flex items-center flex-col p-4 text-black ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Webste URL:"
            className="rounded-full border-green-500 w-full p-4 py-1 my-2 border"
            type="text"
            name="site"
            id=""
          />
          <div className="flex gap-8 justify-between w-full">
            <input
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Username:"
              className="rounded-full border-green-500 w-full p-4 py-1 my-2 border"
              type="text"
              name="name"
              id=""
            />
            <div className=" relative w-full">
              <input
                value={form.pass}
                onChange={handleChange}
                placeholder="Enter Password:"
                className="rounded-full border-green-500 w-full p-4 py-1 my-2 border"
                type={seePass ? "text" : "password"}
                name="pass"
                id=""
              />
              <span
                className="absolute right-2 top-4 cursor-pointer"
                onClick={showpass}
              >
                {seePass ? (
                  <FaRegEye color="gray" size={20} />
                ) : (
                  <FaRegEyeSlash color="gray" size={20} />
                )}
              </span>
            </div>
          </div>
          <button
            onClick={savePass}
            className="my-2 w-fit py-2 font-bold items-center flex justify-center gap-1 bg-green-500 rounded-full border border-green-900 hover:bg-green-300 px-6 hover:border-green-900"
          >
            Save Password <IoIosAddCircleOutline color="white" size={30} />
          </button>
        </div>
        <div className="passwords">
          <h2 className=" font-bold text-2xl py-4">Your passwords</h2>
          {dataArray.length == 0 && <div>No Password to Show</div>}
          {dataArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className=" py-2">Site</th>
                  <th className=" py-2">UserName</th>
                  <th className=" py-2">Passwords</th>
                  <th className=" py-2">Actions</th>
                </tr>
              </thead>
              <tbody className=" bg-green-200">
                {dataArray.map((item) => {
                  return (
                    <tr>
                      <td className="py-1 border border-white text-center min-w-32">
                        <div className=" flex justify-center gap-2 items-center">
                          <a
                            rel={"external"}
                            href={"https://" + item.site}
                            target="_blank"
                          >
                            {item.site}
                          </a>
                          <FaRegCopy
                            cursor={"pointer"}
                            size={20}
                            onClick={() => {
                              copyText(item.site);
                            }}
                          />
                        </div>
                      </td>
                      <td className=" py-1 border border-white text-center min-w-32">
                        <div className="flex justify-center gap-2 items-center">
                          <span>{item.name}</span>
                          <div>
                            <FaRegCopy
                              cursor={"pointer"}
                              size={20}
                              onClick={() => {
                                copyText(item.name);
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-1 border border-white text-center min-w-32">
                        <div className="flex justify-center gap-2 items-center">
                          <span>{item.pass}</span>
                          <div>
                            <FaRegCopy
                              cursor={"pointer"}
                              size={20}
                              onClick={() => {
                                copyText(item.pass);
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-1 border border-white text-center min-w-32">
                        <div className="flex justify-center gap-2 items-center">
                          <span>Edit</span>
                          <CiEdit
                            onClick={() => {
                              editPass(item.id);
                            }}
                            size={20}
                            cursor={"pointer"}
                            style={{
                              borderRight: "2px solid white",
                              paddingRight: "4px",
                            }}
                          />
                          <span>Delete</span>
                          <MdDeleteForever
                            onClick={() => deletePass(item.id)}
                            size={20}
                            cursor={"pointer"}
                            style={{
                              paddingRight: "4px",
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
