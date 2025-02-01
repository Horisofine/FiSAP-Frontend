// "use client";

// import { useEffect } from "react";

// const Dashboard = () => {
//   useEffect(() => {
//     // If needed, you can add any additional logic here
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
//         <p>Your file has been uploaded successfully.</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
"use client";

import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p>Your file has been uploaded successfully.</p>

        {/* Link to the Upload page */}
        <div className="mt-8">
          <Link href="/upload" className="text-blue-500 underline">
            Click here to upload another file
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
