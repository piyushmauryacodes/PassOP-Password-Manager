import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';



const Manger = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setPasswordarray] = useState([])
    const getPasswords = async () => {
        // let req = await fetch("http://localhost:3000/")
        let req = await fetch("https://passop-backend.onrender.com/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordarray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])


    const showpassword = () => {
        if (ref.current.src === "https://www.svgrepo.com/show/380007/eye-password-hide.svg") {
            ref.current.src = "https://static.thenounproject.com/png/5587620-200.png"
            passwordRef.current.type = "password"

        }
        else {
            ref.current.src = "https://www.svgrepo.com/show/380007/eye-password-hide.svg"
            passwordRef.current.type = "text"
        }
    }

    const savepassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            //if same id password comes comes the delte it 
            await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: form.id })
            })

            setPasswordarray([...passwordarray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            // localStorage.setItem("passwords", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
            // console.log(...passwordarray, { ...form, id: uuidv4() })
            setform({ site: "", username: "", password: "" });
        }

    }

    const deletepassword = async (id) => {
        let c = confirm("Are you sure, you want to delte ?")
        if (c) {
            setPasswordarray(passwordarray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordarray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
        }
    }

    const editpassword = (id) => {
        setform({ ...passwordarray.filter(item => item.id === id)[0], id: id })
        setPasswordarray(passwordarray.filter(item => item.id !== id))
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to Clipboard ' + text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="conatiner w-full flex justify-center bg-green-900 min-h-fit h-[85vh] py-8">
                <div className='bg-green-100 h-fit items-center w-1/2 min-w-[300px] flex flex-col gap-4 py-8'>
                    <div className="passop font-bold text-green-600  text-2xl">&lt;<span className='text-black'>Pass</span> <span className='text-green-600'>/OP</span>&gt;</div>
                    <div className="para text-green-800">Your own Password Manger</div>
                    <div className="details w-full px-4 gap-4 flex flex-col">
                        <div className="url">< input name='site' onChange={handlechange} value={form.site} className='bg-white border border-green-700 rounded-full px-4 p-2 w-full' type="text" placeholder='Enter Website URL' /></div>
                        <div className="website-detail flex flex-col md:flex-row w-full gap-4">
                            <div className="username w-full">< input name='username' onChange={handlechange} value={form.username} className='bg-white border border-green-700 rounded-full px-4 p-2 w-full' type="text" placeholder='Enter Username' /></div>
                            <div className="enter-password flex relative">< input ref={passwordRef} name='password' onChange={handlechange} value={form.password} className='bg-white border border-green-700 rounded-full px-4 p-2 w-full' type="password" placeholder='Enter Password ' /> <img ref={ref} onClick={showpassword} src="https://static.thenounproject.com/png/5587620-200.png" alt="" className=' cursor-pointer w-6 absolute right-2 top-2' /></div></div>
                    </div>
                    <div className="add-password-button">
                        <button type='reset' onClick={savepassword} className=' bg-green-500 px-4 py-2 border border-green-800 rounded-full flex items-center gap-2 cursor-pointer'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                                stroke="bold"
                                state="hover-swirl"
                                colors="primary:#121331,secondary:#000000"
                                className='w-8'
                            >
                            </lord-icon>
                            Add Password</button>
                    </div>

                    <div className="passwords w-full px-4">
                        <h2 className='text-2xl font-bold py-2'>Your Passwords</h2>
                        {passwordarray.length === 0 ? <div>There is no passwords to show</div> : <table className="table-auto w-full rounded-2xl overflow-x-auto">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2 w-1/4'>Site</th>
                                    <th className='py-2 w-1/4'>Username</th>
                                    <th className='py-2 w-1/4'>Password</th>
                                    <th className='py-2 w-1/4'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordarray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div className='flex flex-col md:flex-row items-center justify-center '>
                                                <a href={item.site} target='_blank' rel="noreferrer" className='break-all mx-2'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div className='flex flex-col md:flex-row items-center justify-center '>
                                                <span className='break-all mx-2'>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div className='flex flex-col md:flex-row items-center justify-center '>
                                                <span className='break-all mx-2'>{"*".repeat(item.password.length)}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div className='flex flex-col md:flex-row items-center justify-center '>
                                                <span className='break-all mx-2' onClick={() => { editpassword(item.id) }}>
                                                    <lord-icon className='cursor-pointer'
                                                        style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </span>
                                                <div onClick={() => { deletepassword(item.id) }} className='lordiconcopy size-7 cursor-pointer' >
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>}
                    </div>
                </div>
            </div></>

    )
}

export default Manger
