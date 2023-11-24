import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Settings = () => {
  const [settings, setSettings] = useState({});
  const jwtToken = useSelector(state => state.auth.jwtToken); // Assuming the JWT token is stored in auth state

  useEffect(() => {
    if (jwtToken) {
      axios.get('/settings', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }).then(response => {
        setSettings(response.data);
      }).catch(error => {
        console.error('Error fetching settings:', error);
      });
    }
  }, [jwtToken]);

  const handleSave = () => {
    if (jwtToken) {
      axios.put('/settings/update', settings, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }).then(response => {
        alert('Settings updated successfully');
      }).catch(error => {
        console.error('Error updating settings:', error);
      });
    }
  };

  const handleChange = (event) => {
    setSettings({ ...settings, [event.target.name]: event.target.value });
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      {/* Example: Text input for a setting */}
      <input
        type="text"
        name="exampleSetting"
        value={settings.exampleSetting || ''}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default Settings;
