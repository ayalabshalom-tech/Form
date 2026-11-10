import { useState } from 'react';
import './Formoudle.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    workshop: '',          
    participantsCount: '', 
    workshopDate: '',
    attendanceMode: '',    
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validate = (data) => {
    let newErrors = {};

    if (!data.fullName.trim() || data.fullName.length < 2) {
      newErrors.fullName = 'שם מלא חייב להכיל לפחות 2 תווים.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailRegex.test(data.email)) {
      newErrors.email = 'נא להזין כתובת אימייל תקינה.';
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone)) {
      newErrors.phone = 'מספר טלפון חייב להכיל בדיוק 10 ספרות.';
    }

    if (!data.workshop) {
      newErrors.workshop = 'חובה לבחור סדנה.';
    }

    const participants = Number(data.participantsCount);
    if (!data.participantsCount || participants < 1 || participants > 5) {
      newErrors.participantsCount = 'מספר משתתפות חייב להיות מספר שלם בין 1 ל-5.';
    }

    if (!data.workshopDate) {
      newErrors.workshopDate = 'חובה לבחור מועד לסדנה.';
    }

    if (!data.attendanceMode) {
      newErrors.attendanceMode = 'חובה לבחור אופן השתתפות.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setErrors(validate(updatedData));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setShowModal(true); // פתיחת החלון הקופץ
    }
  };

  const confirmSubmit = () => {
    const existingRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const updatedRegistrations = [...existingRegistrations, formData];
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));

    alert("הטופס הוגש בהצלחה ונשמר במערכת!");

    setShowModal(false);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      workshop: '',          
      participantsCount: '', 
      workshopDate: '',
      attendanceMode: '',    
      notes: ''
    });
  };

  const currentErrors = validate(formData);
  const isFormValid = Object.keys(currentErrors).length === 0;

  const getInputClass = (fieldName) => {
    const hasError = errors[fieldName] && (touched[fieldName] || isSubmitted);
    if (hasError) return 'form-control error';
    const isValid = !errors[fieldName] && (touched[fieldName] || formData[fieldName]);
    if (isValid) return 'form-control success';
    return 'form-control';
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <h2>טופס הרשמה לסדנאות</h2>

          {/* 1. שם מלא */}
          <div className="form-group">
            <label>שם מלא:</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              onBlur={handleBlur}
              className={getInputClass('fullName')}
              autoComplete="off"
            />
            {errors.fullName && (touched.fullName || isSubmitted) && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>

          {/* 2. כתובת אימייל */}
          <div className="form-group">
            <label>כתובת אימייל:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              onBlur={handleBlur}
              className={getInputClass('email')}
              autoComplete="off"
            />
            {errors.email && (touched.email || isSubmitted) && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          {/* 3. מספר טלפון */}
          <div className="form-group">
            <label>מספר טלפון:</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              onBlur={handleBlur}
              className={getInputClass('phone')}
              autoComplete="off"
            />
            {errors.phone && (touched.phone || isSubmitted) && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>

          {/* 4. בחירת סדנה */}
          <div className="form-group">
            <label>בחירת סדנה:</label>
            <select 
              name="workshop" 
              value={formData.workshop} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('workshop')}
            >
              <option value="" disabled>בחרי סדנה...</option>
              <option value="עיצוב גרפי">עיצוב גרפי</option>
              <option value="צילום">צילום</option>
              <option value="פיתוח אתרים">פיתוח אתרים</option>
              <option value="בינה מלאכותית">בינה מלאכותית</option>
            </select>
            {errors.workshop && (touched.workshop || isSubmitted) && (
              <div className="error-message">{errors.workshop}</div>
            )}
          </div>

          {/* 5. מספר משתתפות */}
          <div className="form-group">
            <label>מספר משתתפות (1-5):</label>
            <input 
              type="number" 
              name="participantsCount" 
              min="1" 
              max="5" 
              value={formData.participantsCount} 
              onChange={handleChange} 
              onBlur={handleBlur}
              className={getInputClass('participantsCount')}
            />
            {errors.participantsCount && (touched.participantsCount || isSubmitted) && (
              <div className="error-message">{errors.participantsCount}</div>
            )}
          </div>

          {/* 6. מועד הסדנה */}
          <div className="form-group">
            <label>מועד הסדנה:</label>
            <select 
              name="workshopDate" 
              value={formData.workshopDate} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('workshopDate')}
            >
              <option value="" disabled>בחרי מועד...</option>
              <option value="2026-06-01">01/06/2026</option>
              <option value="2026-06-15">15/06/2026</option>
              <option value="2026-07-01">01/07/2026</option>
            </select>
            {errors.workshopDate && (touched.workshopDate || isSubmitted) && (
              <div className="error-message">{errors.workshopDate}</div>
            )}
          </div>

          {/* 7. אופן השתתפות */}
          <div className="form-group">
            <label className="radio-label-title">אופן השתתפות:</label>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="attendanceMode" 
                  value="פרונטלי" 
                  checked={formData.attendanceMode === "פרונטלי"} 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                />
                פרונטלי
              </label>
              <label style={{ marginRight: '20px' }}>
                <input 
                  type="radio" 
                  name="attendanceMode" 
                  value="מקוון" 
                  checked={formData.attendanceMode === "מקוון"} 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                />
                מקוון
              </label>
            </div>
            {errors.attendanceMode && (touched.attendanceMode || isSubmitted) && (
              <div className="error-message">{errors.attendanceMode}</div>
            )}
          </div>

          {/* 8. הערות נוספות */}
          <div className="form-group">
            <label>הערות נוספות:</label>
            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              className="form-control"
              rows="3"
            />
          </div>

          {/* כפתור שליחה */}
          <button 
            type="submit" 
            className={`submit-btn ${isFormValid ? 'active' : 'disabled'}`}
          >
            שליחת טופס ושמירה
          </button>
        </form>
      </div>

      {/* החלון הקופץ ממוקם מחוץ לטופס כדי שייצף על המסך */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>סיכום פרטי ההרשמה</h3>
            <div className="modal-details">
              <p><strong>שם מלא:</strong> {formData.fullName}</p>
              <p><strong>אימייל:</strong> {formData.email}</p>
              <p><strong>טלפון:</strong> {formData.phone}</p>
              <p><strong>סדנה:</strong> {formData.workshop}</p>
              <p><strong>מספר משתתפות:</strong> {formData.participantsCount}</p>
              <p><strong>מועד הסדנה:</strong> {formData.workshopDate}</p>
              <p><strong>אופן השתתפות:</strong> {formData.attendanceMode}</p>
              {formData.notes && <p><strong>הערות:</strong> {formData.notes}</p>}
            </div>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={confirmSubmit}>אישור ושמירה</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>ביטול ותיקון</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationForm;