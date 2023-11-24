import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/settings_service.dart';

class SettingsScreen extends StatefulWidget {
  @override
  _SettingsScreenState createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  Map<String, dynamic> _settings = {};

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  _loadSettings() async {
    var settingsService = Provider.of<SettingsService>(context, listen: false);
    var settings = await settingsService.getSettings();
    setState(() {
      _settings = settings;
    });
  }

  _saveSettings() async {
    var settingsService = Provider.of<SettingsService>(context, listen: false);
    await settingsService.saveSettings(_settings);
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text('Settings saved successfully')));
  }

  _updateSetting(String key, dynamic value) {
    setState(() {
      _settings[key] = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Settings')),
      body: ListView(
        children: _settings.entries.map((entry) {
          return ListTile(
            title: Text(entry.key),
            subtitle: TextFormField(
              initialValue: entry.value.toString(),
              onChanged: (newValue) => _updateSetting(entry.key, newValue),
            ),
          );
        }).toList(),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _saveSettings,
        child: Icon(Icons.save),
      ),
    );
  }
}
