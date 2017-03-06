// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Menu.css';

export default class Menu extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">

          <div className={styles.logo}></div>

          <div className={styles.menu}>

            <hr style={{width: '50%'}}/>

            <div className={styles.menuItemContainer}>

              <div className={styles.menuItem}>
                  <Link to="/" className={this.props.selected == 'home' && styles.selected}>Home</Link>
              </div>
              <div className={styles.menuItem}>
                <Link to="/listening_history" className={this.props.selected == 'listening_history' && styles.selected}>Listening History</Link>
              </div>
              <div className={styles.menuItem}>
                <Link to="/payment_history" className={this.props.selected == 'payment_history' && styles.selected}>Payment History</Link>
              </div>
              <div className={styles.menuItem}>
                <Link to="/settings" className={this.props.selected == 'settings' && styles.selected}>Settings</Link>
              </div>

            </div>

          </div>

          <div className={styles.footer}>
             Made with love @ MIT Media Lab's DCI.
          </div>

        </div>
      </div>
    );
  }
}
