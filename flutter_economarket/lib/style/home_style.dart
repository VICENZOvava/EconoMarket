import 'package:flutter/material.dart';
import 'colors.dart';

/// Estilos exclusivos da Home — coisas que não fazem parte do tema
/// global (theme.dart) por serem específicas dessa tela: o header
/// verde, o banner de ofertas, o card do mercado mais barato,
/// os ícones de categoria e o badge de desconto.
class HomeStyle {
  HomeStyle._();

  // Header (saudação + busca)
  static const double headerBottomRadius = 28;
  static const EdgeInsets headerPadding = EdgeInsets.fromLTRB(20, 16, 20, 24);

  static const BoxDecoration headerDecoration = BoxDecoration(
    color: AppColors.primaryGreen,
    borderRadius: BorderRadius.vertical(
      bottom: Radius.circular(headerBottomRadius),
    ),
  );

  static const TextStyle greetingStyle = TextStyle(
    color: Colors.white70,
    fontSize: 14,
  );

  static const TextStyle titleStyle = TextStyle(
    color: Colors.white,
    fontSize: 22,
    fontWeight: FontWeight.bold,
    height: 1.2,
  );

  // Banner "Super Ofertas"
  static const BoxDecoration bannerDecoration = BoxDecoration(
    color: AppColors.bannerBlue,
    borderRadius: BorderRadius.all(Radius.circular(20)),
  );

  static const TextStyle bannerTitleStyle = TextStyle(
    color: Colors.white,
    fontSize: 18,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle bannerSubtitleStyle = TextStyle(
    color: Colors.white,
    fontSize: 13,
  );

  // Card genérico usado no "mercado mais barato" e nos cards de promoção
  static BoxDecoration get cardDecoration => BoxDecoration(
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

  // Categorias
  static BoxDecoration categoryIconDecoration(Color background) =>
      BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(16),
      );

  static const TextStyle categoryLabelStyle = TextStyle(
    fontSize: 12,
    color: AppColors.textPrimary,
  );

  // Badge "-13%" nos cards de promoção
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
}