import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashboard = (props) => {

  const navigate = useNavigate();

  return (
    <div className={styles.admin_container}>
      <nav className={styles.admin_navbar}>
        <h1>Admin Dashboard</h1>
      
      </nav>

      <div className={styles.admin_content}>
      <div className={styles.functions_container}>

        <center className={styles.sidebar}>
          <h1>Admin Functions</h1>
          <ul>
            <li>
              <Link to="/user-list">View All Users</Link>
            </li>
            <li>
              <Link to="/recipe-list">View All Recipes</Link>
            </li>
            <li>
              <Link to="/techniques">View Culinary Techniques</Link>
            </li>
            <li>
              <Link to="/savings">View Strategic Savings</Link>
            </li>
          </ul>
        </center>
</div>
        <main className={styles.main_content}>
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;