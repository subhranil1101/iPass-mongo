import { useRef, useState, useEffect } from "react";
import Copy from "./Copy";
import Delete from "./Delete";
import Edit from "./Edit";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const ref = useRef();
  const refPass = useRef();

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000");
    let passwords = await req.json();
    setPasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/cross.png";
      refPass.current.type = "text";
    } else {
      ref.current.src = "icons/eye.png";
      refPass.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

      await fetch("http://localhost:3000", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      setForm({ site: "", username: "", password: "" });
      // toast("Saved successfully!", {
      //   position: "top-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
    } else {
      alert("Input proper site, username, password length.");
    }
  };

  const editPassword = (id) => {
    console.log("edit:" + id);
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = async (id) => {
    console.log("deleting:" + id);
    let c = confirm("Do you want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch("http://localhost:3000", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });

      // toast("Password Deleted successfully!", {
      //   position: "top-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    // toast("Copied to Clipboard!", {
    //   position: "top-right",
    //   autoClose: 1000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    // });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer /> */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="mx-auto max-w-7xl items-center">
        <h1 className="text-4xl text-black font-bold text-center">
          <span className="text-red-400">&lt;</span>
          iPass
          <span className="text-red-400">/&gt;</span>
        </h1>
        <p className="text-black text-center text-xl">
          Your password is save with us
        </p>
        <div className="text-white flex flex-col py-4 px-40">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full border-2 border-black text-black px-4 py-1 text-lg"
            type="text"
            name="site"
          />
        </div>
        <div className="flex gap-5 justify-center pb-2">
          <input
            onChange={handleChange}
            value={form.username}
            placeholder="Enter Username"
            className="rounded-full border-black border-2 text-black px-4 py-1 text-lg w-[55%]"
            type="text"
            name="username"
          />
          <div className="relative flex items-center">
            <input
              ref={refPass}
              onChange={handleChange}
              value={form.password}
              placeholder="Enter Password"
              className="rounded-full border-2 border-black text-black px-4 py-1 text-lg"
              type="password"
              name="password"
            />
            <span
              className="absolute right-1 pr-1 cursor-pointer"
              onClick={showPassword}
            >
              <img ref={ref} width={25} src="icons/eye.png" alt="eye" />
            </span>
          </div>
        </div>
        <button
          onClick={savePassword}
          className="text-black text-lg font-bold gap-2 flex justify-center items-center bg-green-500 hover:bg-green-400 px-6 py-2 my-3 rounded-full ml-[44%]  border-green-900"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>
          Save
        </button>
      </div>

      <div className="mx-auto my-10 max-w-5xl items-center">
        <h2 className="my-5 font-bold text-xl">Your passwords</h2>
        {passwordArray.length === 0 && <div>No Passwords to show.</div>}
        {passwordArray.length !== 0 && (
          <table className="table-auto w-full overflow-hidden rounded-2xl mb-10">
            <thead className="bg-green-900 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-300 text-lg">
              {passwordArray.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="text-center border border-slate-100 w-32 py-2 ">
                      <div className="flex justify-center items-center gap-2 py-1">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                        <div
                          className=" flex justify-center items-center"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <Copy />
                        </div>
                      </div>
                    </td>
                    <td className="text-center border border-slate-100 w-32 py-2">
                      <div className="flex justify-center items-center gap-2">
                        {item.username}
                        <div
                          className=" flex justify-center items-center"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <Copy />
                        </div>
                      </div>
                    </td>
                    <td className="text-center border border-slate-100 w-32 py-2">
                      <div className="flex justify-center items-center gap-2">
                        {"*".repeat(item.password.length)}
                        <div
                          className=" flex justify-center items-center"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <Copy />
                        </div>
                      </div>
                    </td>
                    <td className="text-center border border-slate-100 w-2 py-2">
                      <div className="flex justify-center items-center gap-5">
                        <div
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <Edit />
                        </div>
                        <div
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <Delete />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
