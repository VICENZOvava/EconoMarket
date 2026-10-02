import 'package:flutter/material.dart';
import 'style/theme.dart';
import 'ui/splash_page.dart';

void main() {
  runApp(const EconoMarketApp());
}

class EconoMarketApp extends StatelessWidget {
  const EconoMarketApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EconoMarket',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const SplashScreen(),
    );
  }
}
