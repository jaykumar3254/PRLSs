import { useState } from "react";

function Farman() {
  const [city, setCity] = useState("");
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);
          setJsonData(parsedData);
          console.log("Parsed JSON:", parsedData);
        } catch (error) {
          alert("Invalid JSON file",error);
        }
      };
      reader.readAsText(selectedFile);
    } else {
      alert("Please upload a valid JSON file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city || !jsonData) {
      alert("Please fill all fields");
      return;
    }

    const finalData = {
      city: city,
      data: jsonData,
    };

    console.log("Final Data:", finalData);

    // fetch("http://localhost:5000/api", { method: "POST", body: JSON.stringify(finalData) })

    alert("Form Submitted Successfully");
  };

  const handleCancel = () => {
    setCity("");
    setFile(null);
    setJsonData(null);
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-transparent text-white rounded-sm border mt-0 border-white">
      <h2 className="text-xl font-bold mb-4">Upload Apartment Data</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Farman;