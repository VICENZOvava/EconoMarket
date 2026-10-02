import 'package:flutter/material.dart';
import 'colors.dart';

/// Estilos exclusivos da tela Promoções.
class PromocoesStyle {
  PromocoesStyle._();

  static const TextStyle titleStyle = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle subtitleStyle = TextStyle(
    fontSize: 13,
    color: AppColors.textSecondary,
  );

  // Chips de filtro por categoria ("Todos", "Hortifruti", "Carnes"...)
  static BoxDecoration filterChipDecoration(bool active) => BoxDecoration(
        color: active ? AppColors.primaryGreen : const Color(0xFFF0F0F0),
        borderRadius: BorderRadius.circular(20),
      );

  static TextStyle filterChipTextStyle(bool active) => TextStyle(
        color: active ? Colors.white : AppColors.textPrimary,
        fontWeight: active ? FontWeight.bold : FontWeight.w500,
        fontSize: 13,
      );

  // Card de produto em promoção
  static BoxDecoration get cardDecoration => BoxDecoration(
        color: AppColors.cardWhite,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      );

  static const BoxDecoration discountBadgeDecoration = BoxDecoration(
    color: AppColors.promotionRed,
    borderRadius: BorderRadius.only(
      topLeft: Radius.circular(12),
      bottomRight: Radius.circular(12),
    ),
  );

  static const TextStyle discountBadgeTextStyle = TextStyle(
    color: Colors.white,
    fontSize: 11,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle brandStyle = TextStyle(
    fontSize: 11,
    color: AppColors.textSecondary,
  );

  static const TextStyle nameStyle = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle marketStyle = TextStyle(
    fontSize: 12,
    color: AppColors.textSecondary,
  );

  static const TextStyle oldPriceStyle = TextStyle(
    fontSize: 12,
    color: AppColors.priceStrikethrough,
    decoration: TextDecoration.lineThrough,
  );

  static const TextStyle newPriceStyle = TextStyle(
    fontSize: 17,
    fontWeight: FontWeight.bold,
    color: AppColors.promotionRed,
  );

  static const BoxDecoration addButtonDecoration = BoxDecoration(
    color: AppColors.primaryGreen,
    shape: BoxShape.circle,
  );
}