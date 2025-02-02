
const FileUploadSection = ({ file, setFile, setReport, loading, setLoading, endpoint }) => {
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log("Report data:", data.data);
            setReport(data.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-8 flex items-center space-x-4">
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="border border-gray-300 rounded p-2"
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleUpload}
                disabled={loading}
            >
                {loading ? "Uploading..." : "Upload Data"}
            </button>
        </div>
    );
};

export default FileUploadSection;