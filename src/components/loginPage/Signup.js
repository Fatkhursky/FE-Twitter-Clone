import { monthsDate, daysDate, yearsDate } from "./valueDate.js";
import { Link } from "react-router-dom";


const Signup = ({
  onChangeName,
  onChangePhone,
  onChangeMonth,
  onChangeDay,
  onChangeYears,
  color,
  pointer,
  event,
  onClick,
  month,
  year,
  day
}) => {
  const isApril = month === "April";
  const isJune = month === "June";
  const isSeptember = month === "September";
  const isNovember = month === "November";
  const isFebruary = month === "February";
  const yearNotNull = year !== "";
  const isLeapYear = () =>
    yearNotNull && year % 100 === 0
      ? yearNotNull && year % 400 === 0
      : yearNotNull && year % 4 === 0;
  const yearComp = yearsDate.map((obj) => obj.component)

const yearFilter = yearsDate.map((obj) => {
    if (obj.value % 4 === 0) {
      return obj.component
    } return obj.value
  })



  //console.log(1111, yearFilter)


  const getDay = () => {
    if (isApril || isJune || isSeptember || isNovember) {
      return daysDate.slice(0, 31); // -- 30 hari
    } else if (isFebruary && isLeapYear()) {
      return daysDate.slice(0, 30); // -- 29 hari
    } else if (isFebruary) {
      return daysDate.slice(0, 30);   // -- 28 hari error
    } else {
      return daysDate;
    }
  };

  const getYear = () => {
    if (isFebruary && day === '29') {
      return yearFilter
    } else {
      return yearComp
    }
  }

  return (
    <div>
      <div className="loginpage__signup__box">
        <h1 className="loginpage__signup__title">Create your account</h1>
        <div className="loginpage__signup__inputs1">
          <input
            className="loginpage__signup__name"
            type="text"
            placeholder="Name"
            onChange={onChangeName}
          />
        </div>
        <div className="loginpage__signup__inputs1">
          <input
            className="loginpage__signup__phone"
            type="text"
            placeholder="Phone"
            onChange={onChangePhone}
          />
        </div>
        <div className="loginpage__signup__content">
          <p style={{ cursor: "pointer", color: "rgb(30, 167, 247)" }}>
            Use email instead
          </p>
          <div>
            <p
              className="loginpage__signup__date"
              style={{ cursor: "pointer" }}
            >
              Date of birth
            </p>
            <p className="loginpage__signup__desc">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>
          </div>
        </div>
        <form className="loginpage__signup__inputs2">
          <select
            className="loginpage__signup__month"
            list="Month"
            placeholder="Month"
            onChange={onChangeMonth}
          >
            {monthsDate}
          </select>
          <select
            className="loginpage__signup__day"
            list="Days"
            placeholder="Day"
            onChange={onChangeDay}
          >
            {getDay()}
          </select>
          <select
            className="loginpage__signup__years"
            list="Years"
            placeholder="Year"
            onChange={onChangeYears}
          >
            {getYear()}
          </select>
        </form>
        {
          <Link
            className="loginpage__signup__button"
            to="/home"
            style={{
              textDecoration: "none",
              backgroundColor: color,
              cursor: pointer,
              pointerEvents: event,
            }}
            onClick={onClick}
          >
            Next
          </Link>
        }
      </div>
    </div>
  );
};

export default Signup;
