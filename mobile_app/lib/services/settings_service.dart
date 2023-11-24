import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SettingsService {
  final FlutterSecureStorage _secureStorage = FlutterSecureStorage();
  final String _backendSettingsUrl = 'http://your-backend-url.com/settings';

  Future<Map<String, dynamic>> getSettings() async {
    String? jwtToken = await _secureStorage.read(key: 'jwt_token');
    final response = await http.get(
      Uri.parse(_backendSettingsUrl),
      headers: {
        'Authorization': 'Bearer $jwtToken',
      },
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load settings');
    }
  }

  Future<void> saveSettings(Map<String, dynamic> settings) async {
    String? jwtToken = await _secureStorage.read(key: 'jwt_token');
    final response = await http.put(
      Uri.parse(_backendSettingsUrl),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $jwtToken',
      },
      body: json.encode(settings),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update settings');
    }
  }
}
