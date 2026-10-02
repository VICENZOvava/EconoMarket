import 'package:flutter/material.dart';
import 'colors.dart';

/// Estilos exclusivos da tela Comparar Preços.
class CompararStyle {
  CompararStyle._();

  static const TextStyle titleStyle = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle subtitleStyle = TextStyle(
    fontSize: 13,
    color: AppColors.textSecondary,
  );

  // Card verde "Mais econômico para lista"
  static BoxDecoration get bestMarketCardDecoration => BoxDecoration(
        color: AppColors.primaryGreen,
        borderRadius: BorderRadius.circular(20),
      );

  static const TextStyle bestMarketLabelStyle = TextStyle(
    color: Colors.white70,
    fontSize: 13,
  );

  static const TextStyle bestMarketNameStyle = TextStyle(
    color: Colors.white,
    fontSize: 22,
    fontWeight: FontWeight.bold,
  );

  static BoxDecoration get totalCardDecoration => BoxDecoration(
        color: Colors.white.withOpacity(0.15),
        borderRadius: BorderRadius.circular(14),
      );

  static BoxDecoration get economyCardDecoration => BoxDecoration(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.highlightYellow, width: 1.5),
      );

  static const TextStyle innerStatLabelStyle = TextStyle(
    color: Colors.white70,
    fontSize: 12,
  );

  static TextStyle innerStatValueStyle(Color color) => TextStyle(
        color: color,
        fontSize: 18,
        fontWeight: FontWeight.bold,
      );

  // Cards brancos genéricos ("Total por supermercado", "Preços por produto")
  static BoxDecoration get sectionCardDecoration => BoxDecoration(
        color: AppColors.cardWhite,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      );

  static const TextStyle sectionTitleStyle = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  // Barra "Total por supermercado"
  static const Color barBestColor = AppColors.bestPriceGreen;
  static const Color barDefaultColor = Color(0xFFE0E0E0);

  static TextStyle barValueStyle(bool isBest) => TextStyle(
        fontSize: 13,
        fontWeight: FontWeight.bold,
        color: isBest ? barBestColor : AppColors.textPrimary,
      );

  static const TextStyle barLabelStyle = TextStyle(
    fontSize: 11,
    color: AppColors.textSecondary,
  );

  // Lista "Preços por produto"
  static const TextStyle productNameStyle = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle productSubtitleStyle = TextStyle(
    fontSize: 12,
    color: AppColors.textSecondary,
  );

  static BoxDecoration priceCardDecoration(bool isBest) => BoxDecoration(
        color: isBest ? AppColors.bestPriceBackground : const Color(0xFFF5F6F8),
        borderRadius: BorderRadius.circular(12),
        border: isBest
            ? Border.all(color: AppColors.bestPriceGreen, width: 1.2)
            : null,
      );

  static const TextStyle priceCardMarketStyle = TextStyle(
    fontSize: 11,
    color: AppColors.textSecondary,
  );

  static const TextStyle priceCardOldPriceStyle = TextStyle(
    fontSize: 11,
    color: AppColors.priceStrikethrough,
    decoration: TextDecoration.lineThrough,
  );

  static TextStyle priceCardNewPriceStyle(bool isBest) => TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.bold,
        color: isBest ? AppColors.bestPriceGreen : AppColors.textPrimary,
      );

  static const BoxDecoration discountBadgeDecoration = BoxDecoration(
    color: AppColors.promotionRed,
    borderRadius: BorderRadius.only(
      topRight: Radius.circular(10),
      bottomLeft: Radius.circular(10),
    ),
  );

  static const TextStyle discountBadgeTextStyle = TextStyle(
    color: Colors.white,
    fontSize: 10,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle bestPriceTagStyle = TextStyle(
    fontSize: 9,
    fontWeight: FontWeight.bold,
    color: AppColors.bestPriceGreen,
  );
}