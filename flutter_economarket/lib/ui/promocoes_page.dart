import 'package:flutter/material.dart';
import '../style/colors.dart';
import '../style/promocoes_style.dart';

/// Tela de Promoções (RF006 - Visualização de promoções).
///
/// TODO: a lista de produtos está fixa (mock) só pra montar o layout.
/// Trocar pelos produtos reais em promoção quando o back-end / modelo
/// de dados estiver pronto. O filtro por categoria já funciona sobre
/// o campo `category` de cada item mock.
class PromocoesPage extends StatefulWidget {
  const PromocoesPage({super.key});

  @override
  State<PromocoesPage> createState() => _PromocoesPageState();
}

class _PromocoesPageState extends State<PromocoesPage> {
  String _selectedCategory = 'Todos';

  @override
  Widget build(BuildContext context) {
    final filtered = _selectedCategory == 'Todos'
        ? _promotions
        : _promotions.where((p) => p.category == _selectedCategory).toList();

    return Scaffold(
      backgroundColor: AppColors.cardWhite,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 0),
              child: _buildTitle(),
            ),
            const SizedBox(height: 16),
            _buildCategoryFilters(),
            const SizedBox(height: 16),
            Expanded(
              child: filtered.isEmpty
                  ? const Center(
                      child: Text(
                        'Nenhuma promoção nessa categoria',
                        style: TextStyle(color: AppColors.textSecondary),
                      ),
                    )
                  : ListView.separated(
                      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                      itemCount: filtered.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 12),
                      itemBuilder: (context, index) =>
                          _PromoListCard(promo: filtered[index]),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTitle() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: const [
            Text('Promoções', style: PromocoesStyle.titleStyle),
            SizedBox(width: 6),
            Text('🔥', style: TextStyle(fontSize: 20)),
          ],
        ),
        const SizedBox(height: 4),
        Text('${_promotions.length} ofertas disponíveis hoje',
            style: PromocoesStyle.subtitleStyle),
      ],
    );
  }

  Widget _buildCategoryFilters() {
    return SizedBox(
      height: 40,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        scrollDirection: Axis.horizontal,
        itemCount: _categoryFilters.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final category = _categoryFilters[index];
          final active = category.label == _selectedCategory;
          return GestureDetector(
            onTap: () => setState(() => _selectedCategory = category.label),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              alignment: Alignment.center,
              decoration: PromocoesStyle.filterChipDecoration(active),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (category.icon != null) ...[
                    Text(category.icon!,
                        style: const TextStyle(fontSize: 14)),
                    const SizedBox(width: 4),
                  ],
                  Text(category.label,
                      style: PromocoesStyle.filterChipTextStyle(active)),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class _CategoryFilter {
  final String label;
  final String? icon;

  const _CategoryFilter(this.label, this.icon);
}

// TODO: "Limpeza" e "Higiene" foram incluídas pra manter consistência
// com as categorias da Home; ajuste a lista conforme o print completo
// (o print original corta na 4ª opção).
const List<_CategoryFilter> _categoryFilters = [
  _CategoryFilter('Todos', null),
  _CategoryFilter('Hortifruti', '🥦'),
  _CategoryFilter('Carnes', '🥩'),
  _CategoryFilter('Bebidas', '🥤'),
  _CategoryFilter('Limpeza', '🧽'),
  _CategoryFilter('Higiene', '🧴'),
];

class _Promotion {
  final String brand;
  final String name;
  final String market;
  final double oldPrice;
  final double newPrice;
  final int discountPercent;
  final String category;

  const _Promotion({
    required this.brand,
    required this.name,
    required this.market,
    required this.oldPrice,
    required this.newPrice,
    required this.discountPercent,
    required this.category,
  });
}

const List<_Promotion> _promotions = [
  _Promotion(
    brand: 'Italac',
    name: 'Leite Integral 1L',
    market: 'Carrefour',
    oldPrice: 5.49,
    newPrice: 4.79,
    discountPercent: 13,
    category: 'Bebidas',
  ),
  _Promotion(
    brand: 'Tio João',
    name: 'Arroz Branco 5kg',
    market: 'Extra',
    oldPrice: 27.99,
    newPrice: 24.90,
    discountPercent: 11,
    category: 'Mercearia',
  ),
  _Promotion(
    brand: 'Liza',
    name: 'Óleo de Soja 900ml',
    market: 'Carrefour',
    oldPrice: 9.99,
    newPrice: 7.99,
    discountPercent: 20,
    category: 'Mercearia',
  ),
  _Promotion(
    brand: 'Sadia',
    name: 'Frango Inteiro kg',
    market: 'Assaí',
    oldPrice: 13.99,
    newPrice: 10.99,
    discountPercent: 21,
    category: 'Carnes',
  ),
];

class _PromoListCard extends StatelessWidget {
  final _Promotion promo;

  const _PromoListCard({required this.promo});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: PromocoesStyle.cardDecoration,
      child: Row(
        children: [
          Stack(
            children: [
              // TODO: trocar por Image.network/Image.asset com a foto real
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  color: AppColors.divider,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.shopping_bag_outlined,
                    color: AppColors.textSecondary, size: 28),
              ),
              Positioned(
                top: 0,
                left: 0,
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                  decoration: PromocoesStyle.discountBadgeDecoration,
                  child: Text('-${promo.discountPercent}%',
                      style: PromocoesStyle.discountBadgeTextStyle),
                ),
              ),
            ],
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(promo.brand, style: PromocoesStyle.brandStyle),
                Text(promo.name, style: PromocoesStyle.nameStyle),
                Text(promo.market, style: PromocoesStyle.marketStyle),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Text(
                      'R\$ ${promo.oldPrice.toStringAsFixed(2).replaceAll('.', ',')}',
                      style: PromocoesStyle.oldPriceStyle,
                    ),
                  ],
                ),
                Text(
                  'R\$ ${promo.newPrice.toStringAsFixed(2).replaceAll('.', ',')}',
                  style: PromocoesStyle.newPriceStyle,
                ),
              ],
            ),
          ),
          // TODO: ligar ao carrinho / lista de compras quando existir
          GestureDetector(
            onTap: () {},
            child: Container(
              width: 40,
              height: 40,
              decoration: PromocoesStyle.addButtonDecoration,
              child: const Icon(Icons.add, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}