import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:provider/provider.dart';
import '../services/authentication_service.dart';

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final authService =
        Provider.of<AuthenticationService>(context, listen: false);

    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            final success = await authService.signInWithGoogle();
            if (success) {
              Navigator.pushReplacementNamed(
                  context, '/home'); // Navigate to home screen on success
            } else {
              ScaffoldMessenger.of(context)
                  .showSnackBar(SnackBar(content: Text('Login Failed')));
            }
          },
          child: Text('Sign in with Google'),
        ),
      ),
    );
  }
}
