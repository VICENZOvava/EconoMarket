import 'package:flutter/material.dart';
import 'colors.dart';

/// Estilos exclusivos da tela Perfil.
class PerfilStyle {
  PerfilStyle._();

  // Header (avatar + nome + email + avaliação)
  static const double headerBottomRadius = 28;
  static const EdgeInsets headerPadding = EdgeInsets.fromLTRB(20, 24, 20, 32);

  static const BoxDecoration headerDecoration = BoxDecoration(
    color: AppColors.primaryGreen,
    borderRadius: BorderRadius.vertical(
      bottom: Radius.circular(headerBottomRadius),
    ),
  );

  static BoxDecoration get avatarDecoration => BoxDecoration(
        color: AppColors.primaryGreenLight,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white70, width: 2),
      );

  static const TextStyle nameStyle = TextStyle(
    color: Colors.white,
    fontSize: 18,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle emailStyle = TextStyle(
    color: Colors.white70,
    fontSize: 13,
  );

  static const TextStyle ratingLabelStyle = TextStyle(
    color: Colors.white,
    fontSize: 13,
    fontWeight: FontWeight.w500,
  );

  // Cards de estatística (Economizados / Listas / Média de desconto)
  static BoxDecoration get statCardDecoration => BoxDecoration(
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

  static TextStyle statValueStyle(Color color) => TextStyle(
        fontSize: 19,
        fontWeight: FontWeight.bold,
        color: color,
      );

  static const TextStyle statLabelStyle = TextStyle(
    fontSize: 11,
    color: AppColors.textSecondary,
  );

  // Card "Mercados favoritos"
  static BoxDecoration get sectionCardDecoration => BoxDecoration(
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

  static const TextStyle sectionTitleStyle = TextStyle(
    fontSize: 15,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static BoxDecoration favoriteMarketBadgeDecoration(Color color) =>
      BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(14),
      );

  static const TextStyle favoriteMarketInitialsStyle = TextStyle(
    color: Colors.white,
    fontWeight: FontWeight.bold,
    fontSize: 15,
  );

  static const TextStyle favoriteMarketLabelStyle = TextStyle(
    fontSize: 11,
    color: AppColors.textSecondary,
  );

  // Itens de menu (Histórico, Notificações, Minha região etc.)
  static BoxDecoration menuIconDecoration(Color background) => BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(12),
      );

  static const TextStyle menuTitleStyle = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: AppColors.textPrimary,
  );

  static const TextStyle menuSubtitleStyle = TextStyle(
    fontSize: 12,
    color: AppColors.textSecondary,
  );
}