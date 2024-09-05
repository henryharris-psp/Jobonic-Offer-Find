import { useState } from 'react';
import axios from 'axios';

function EducationForm({ , onSave }) {
  const [education, setEducation] = useState({
    id: '',
    profileId: profileId,
    institute: '',
    degree: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Save data to backend
    axios.post('/user-education', education)
      .then(response => {
        console.log('Education saved successfully', response.data);
        onSave(response.data);  // Callback to parent component to refresh the data or close the form
      })
      .catch(error => {
        console.error('There was an error saving the education!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded">
      <div>
        <label htmlFor="institute" className="block text-sm font-medium text-gray-700">Institute</label>
        <input
          type="text"
          id="institute"
          name="institute"
          value={education.institute}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
        <input
          type="text"
          id="degree"
          name="degree"
          value={education.degree}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={education.startDate}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={education.endDate}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        Save Education
      </button>
    </form>
  );
}

export default EducationForm;
