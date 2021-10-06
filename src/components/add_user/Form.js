import { useState, useEffect } from 'react'


/**
 * Great job overall Chad! I really liked what you've done.
 * There were a few things that could have been done better
 * but the essense was there and it was working! Great job!
 * 
 * Let me know if any of the comments doesn't make sense and
 * we can go over those
 * 
 * You did very well with this task, congrats!
 *  
 */



const Form = () => {
  // Awesome use of useState
  const [inputs, setInputs] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  // This makes no sense =)
  // useEffect(() => { }, [submitMessage]);

  // Loved this helper method
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value })) // Great use of the spread operator
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Nice! No automatic reloads

    fetch("https://api-how-much-do-you-know-node.herokuapp.com/user/add-user", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs)
    }).then(response => {
      
      if (response.status === 200) {
        /** This is fine, but I was looking to see if you could use the message you get
         *  from the API response.
         * 
         *  Something like this:
         *  
         * Line 36 which you return the result of this promisse
         * Lines 43-47 where we receive the result of the first promisse(line 23) after returning it(line 36)
         * then we use that result to setSumitMessage by accessing the message prop
         */
        
        // setSubmitMessage("Thank you, the user has been added");

        setInputs({}); // Nice, easy way of resetting the form! Great job

        return response.json()
      } else {
        setSubmitMessage("Sorry, something went wrong! Please try again later");
      }
    }).then(result => {
      setSubmitMessage(result.message);
    }).catch(error => {
      // When working with promisses you must use a try/catch for async functions or 
      // finish your chaining then(), with a catch().
      // If any weird error would have happened before reaching line 23 the website would crash
      // because you did not handle errors.
      console.log(error);
      setSubmitMessage("Sorry, something went wrong! Please try again later");
    })
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
            value={inputs.first_name || ""} // Why did you add the OR here?
            onChange={handleChange}
            minLength="4"
            required // This works, but if this "required" was not here, how would you validate the input?
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
            value={inputs.last_name || ""} // Why did you add the OR here?
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
            value={inputs.email || ""} // Why did you add the OR here?
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
            value={inputs.occupation || ""} // Why did you add the OR here?
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