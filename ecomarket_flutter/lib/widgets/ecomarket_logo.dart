import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class EcoMarketLogo extends StatelessWidget {
  final double iconSize;
  final double textSize;

  const EcoMarketLogo({
    super.key,
    this.iconSize = 44,
    this.textSize = 28,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: iconSize,
          height: iconSize,
          decoration: BoxDecoration(
            color: AppColors.green,
            borderRadius: BorderRadius.circular(iconSize * .28),
          ),
          child: Icon(
            Icons.person_outline_rounded,
            color: Colors.white,
            size: iconSize * .58,
          ),
        ),
        const SizedBox(width: 10),
        RichText(
          text: TextSpan(
            style: TextStyle(
              fontSize: textSize,
              fontWeight: FontWeight.w800,
              letterSpacing: -1.2,
            ),
            children: const [
              TextSpan(
                text: 'Eco',
                style: TextStyle(color: AppColors.green),
              ),
              TextSpan(
                text: 'Market',
                style: TextStyle(color: AppColors.text),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
