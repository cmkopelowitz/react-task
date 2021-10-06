import { useState, useEffect } from 'react'

const Form = () => {
  const [inputs, setInputs] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => { }, [submitMessage]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://api-how-much-do-you-know-node.herokuapp.com/user/add-user", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs)
    }).then(response => {
      if (response.status === 200) {
        setSubmitMessage("Thank you, the user has been added");
        setInputs({});
      } else {
        setSubmitMessage("Sorry, something went wrong! Please try again later");
      }
    });
  }

  return (
    <div className={"w-full max-w-xs mx-auto"}>
      <h1 className={"text-xl font-bold my-2"}>Add User</h1>
      <form
        onSubmit={handleSubmit}
        className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"}
      >
        <div className={"mb-4"}>
          <label
            htmlFor="first_name"
            className={"block text-gray-700 text-sm font-bold mb-2"}
          >
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={inputs.first_name || ""}
            onChange={handleChange}
            minLength="4"
            required
            className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
          />
        </div>
        <div className={"mb-4"}>
          <label htmlFor="last_name" className={"block text-gray-700 text-sm font-bold mb-2"}>
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={inputs.last_name || ""}
            onChange={handleChange}
            minLength="4"
            required
            className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
          />
        </div>
        <div className={"mb-4"}>
          <label htmlFor="email" className={"block text-gray-700 text-sm font-bold mb-2"} >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
            required
            className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
          />
        </div>
        <div className={"mb-4"}>
          <label htmlFor="occupation" className={"block text-gray-700 text-sm font-bold mb-2"} >
            Occupation
          </label>
          <input
            type="text"
            name="occupation"
            value={inputs.occupation || ""}
            onChange={handleChange}
            minLength="4"
            required
            className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
          />
        </div>
        <div className={"flex w-full max-w-xs justify-end"}>
          <button type="submit" className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
          >
            Add User
          </button>
        </div>
      </form>
      <div className={"text-center block text-gray-700 text-sm font-bold mb-2"}>{submitMessage}
      </div>
    </div>
  )
};

export default Form