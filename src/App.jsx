import React from 'react';
import Form from './Components/Form'; // או לפי הנתיב שבו שמרת את קובץ ה-Form שלך

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', direction: 'rtl', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>מערכת הרשמה לסדנאות</h1>
      <Form />
    </div>
  );
}