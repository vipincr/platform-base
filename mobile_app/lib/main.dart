import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'screens/login_screen.dart';
import 'screens/settings_screen.dart';
import 'services/authentication_service.dart';
import 'services/settings_service.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<AuthenticationService>(
          create: (_) => AuthenticationService(),
        ),
        Provider<SettingsService>(
          create: (_) => SettingsService(),
        ),
      ],
      child: MaterialApp(
        title: 'Platform Base',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        initialRoute: '/',
        routes: {
          '/': (context) => LoginScreen(),
          '/settings': (context) => SettingsScreen(),
        },
      ),
    );
  }
}
