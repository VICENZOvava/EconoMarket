import 'package:flutter/material.dart';
import 'colors.dart';

/// Estilos exclusivos da tela Lista.
///
/// Sem protótipo oficial pra essa tela ainda — desenhado a partir do
/// RF005 (lista de compras e cálculo do total) e do padrão visual
/// já usado em Promoções e Comparar. Ajuste quando o grupo definir
/// o layout oficial.
class ListaStyle {
  ListaStyle._();

  static const TextStyle titleStyle = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle subtitleStyle = TextStyle(
    fontSize: 13,
    color: AppColors.textSecondary,
  );

  static const TextStyle clearActionStyle = TextStyle(
    fontSize: 13,
    fontWeight: FontWeight.w600,
    color: AppColors.promotionRed,
  );

  // Card de item da lista
  static BoxDecoration get itemCardDecoration => BoxDecoration(
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

  static const TextStyle itemNameStyle = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle itemUnitStyle = TextStyle(
    fontSize: 12,
    color: AppColors.textSecondary,
  );

  // Stepper de quantidade (- N +)
  static BoxDecoration get quantityStepperDecoration => BoxDecoration(
        color: const Color(0xFFF5F6F8),
        borderRadius: BorderRadius.circular(10),
      );

  static const TextStyle quantityTextStyle = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  // Estado vazio
  static const TextStyle emptyTitleStyle = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle emptySubtitleStyle = TextStyle(
    fontSize: 13,
    color: AppColors.textSecondary,
  );

  // Botão "Adicionar produto"
  static BoxDecoration get addButtonDecoration => BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.primaryGreen, width: 1.4),
      );

  static const TextStyle addButtonTextStyle = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: AppColors.primaryGreen,
  );

  // Rodapé fixo com o resumo e o botão "Comparar preços"
  static BoxDecoration get footerDecoration => BoxDecoration(
        color: AppColors.cardWhite,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 12,
            offset: const Offset(0, -2),
          ),
        ],
      );
}