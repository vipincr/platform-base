import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AuthenticationService {
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  final FlutterSecureStorage _secureStorage = FlutterSecureStorage();
  final String _backendAuthUrl = 'http://your-backend-url.com/auth/google';

  Future<bool> signInWithGoogle() async {
    try {
      final googleUser = await _googleSignIn.signIn();
      final googleAuth = await googleUser?.authentication;

      final response = await http.post(
        Uri.parse(_backendAuthUrl),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'token': googleAuth?.idToken,
        }),
      );

      if (response.statusCode == 200) {
        final jwtToken = json.decode(response.body)['access_token'];
        await _secureStorage.write(key: 'jwt_token', value: jwtToken);
        return true;
      }

      return false;
    } catch (e) {
      print('Error during Google Sign-In: $e');
      return false;
    }
  }

  Future<void> signOut() async {
    await _googleSignIn.signOut();
    await _secureStorage.delete(key: 'jwt_token');
  }
}
