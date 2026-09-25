import 'package:flutter/material.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(const EcoMarketApp());
}

class EcoMarketApp extends StatelessWidget {
  const EcoMarketApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'EcoMarket',
      theme: ThemeData(
        fontFamily: 'Arial',
        scaffoldBackgroundColor: Colors.white,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2E8B35),
        ),
        useMaterial3: true,
      ),
      home: const SplashScreen(),
    );
  }
}
