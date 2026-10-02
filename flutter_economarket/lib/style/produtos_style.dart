import 'package:flutter/material.dart';
import 'colors.dart';

/// Estilos exclusivos da tela Produtos.
///
/// Sem protótipo oficial ainda — desenhado a partir do RF003
/// (cadastro/consulta de produtos), RF004 (menor preço em destaque)
/// e RF007 (filtros e ordenação), seguindo o padrão visual já usado
/// nas outras telas. Ajuste quando o grupo definir o layout oficial.
class ProdutosStyle {
  ProdutosStyle._();

  static const TextStyle titleStyle = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle subtitleStyle = TextStyle(
    fontSize: 13,
    color: AppColors.textSecondary,
  );

  // Campo de busca
  static InputDecoration searchFieldDecoration() => InputDecoration(
        hintText: 'Buscar produto...',
        prefixIcon: const Icon(Icons.search, color: AppColors.textSecondary),
        filled: true,
        fillColor: const Color(0xFFF5F6F8),
        contentPadding:
            const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
      );

  // Chips de categoria (preenchidos)
  static BoxDecoration categoryChipDecoration(bool active) => BoxDecoration(
        color: active ? AppColors.primaryGreen : const Color(0xFFF0F0F0),
        borderRadius: BorderRadius.circular(20),
      );

  static TextStyle categoryChipTextStyle(bool active) => TextStyle(
        color: active ? Colors.white : AppColors.textPrimary,
        fontWeight: active ? FontWeight.bold : FontWeight.w500,
        fontSize: 13,
      );

  // Chips de ordenação (contornados)
  static BoxDecoration sortChipDecoration(bool active) => BoxDecoration(
        color: active ? AppColors.bestPriceBackground : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: active ? AppColors.primaryGreen : AppColors.divider,
        ),
      );

  static TextStyle sortChipTextStyle(bool active) => TextStyle(
        color: active ? AppColors.primaryGreen : AppColors.textSecondary,
        fontWeight: FontWeight.w600,
        fontSize: 12,
      );

  static const TextStyle sortLabelStyle = TextStyle(
    fontSize: 12,
    color: AppColors.textSecondary,
  );

  // Card de produto (grid)
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
    fontSize: 10,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle productNameStyle = TextStyle(
    fontSize: 13,
    fontWeight: FontWeight.bold,
    color: AppColors.textPrimary,
  );

  static const TextStyle productCategoryStyle = TextStyle(
    fontSize: 11,
    color: AppColors.textSecondary,
  );

  // Preço em destaque (RF004: menor preço com fundo verde claro e troféu)
  static const TextStyle bestPriceLabelStyle = TextStyle(
    fontSize: 10,
    color: AppColors.textSecondary,
  );

  static const TextStyle bestPriceMarketStyle = TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.w600,
    color: AppColors.bestPriceGreen,
  );

  static const TextStyle bestPriceValueStyle = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: AppColors.bestPriceGreen,
  );

  static const TextStyle oldPriceStyle = TextStyle(
    fontSize: 11,
    color: AppColors.priceStrikethrough,
    decoration: TextDecoration.lineThrough,
  );

  static const BoxDecoration addButtonDecoration = BoxDecoration(
    color: AppColors.primaryGreen,
    shape: BoxShape.circle,
  );
}