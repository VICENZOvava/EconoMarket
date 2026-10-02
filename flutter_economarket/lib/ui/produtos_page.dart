import 'package:flutter/material.dart';
import '../style/colors.dart';
import '../style/produtos_style.dart';

enum _SortOption { menorPreco, maiorEconomia }

/// Tela Produtos: catálogo geral, com busca, filtro por categoria e
/// ordenação (RF003, RF004 e RF007).
///
/// Sem protótipo oficial ainda pra essa tela — desenho baseado nos
/// requisitos e no padrão visual das outras telas. É essa tela que
/// deve abrir quando o usuário tocar em "+ Adicionar produto" na
/// Lista, ou numa categoria/busca da Home (ainda não ligado — ver
/// TODOs nessas telas).
///
/// TODO: os produtos estão fixos (mock) só pra montar o layout e a
/// interação de busca/filtro/ordenação. Trocar pelos produtos reais
/// (RF003) quando o back-end / modelo de dados estiver pronto.
class ProdutosPage extends StatefulWidget {
  const ProdutosPage({super.key});

  @override
  State<ProdutosPage> createState() => _ProdutosPageState();
}

class _ProdutosPageState extends State<ProdutosPage> {
  String _selectedCategory = 'Todos';
  _SortOption _sortOption = _SortOption.menorPreco;
  String _searchQuery = '';

  List<_Product> get _filteredProducts {
    var list = _products.where((p) {
      final matchesCategory =
          _selectedCategory == 'Todos' || p.category == _selectedCategory;
      final matchesSearch =
          p.name.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).toList();

    list.sort((a, b) {
      if (_sortOption == _SortOption.menorPreco) {
        return a.bestPrice.compareTo(b.bestPrice);
      }
      final economyA = a.discountPercent ?? 0;
      final economyB = b.discountPercent ?? 0;
      return economyB.compareTo(economyA);
    });

    return list;
  }

  @override
  Widget build(BuildContext context) {
    final filtered = _filteredProducts;

    return Scaffold(
      backgroundColor: AppColors.cardWhite,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 0),
              child: _buildHeader(filtered.length),
            ),
            const SizedBox(height: 14),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: _buildSearchField(),
            ),
            const SizedBox(height: 14),
            _buildCategoryFilters(),
            const SizedBox(height: 10),
            _buildSortRow(),
            const SizedBox(height: 12),
            Expanded(
              child: filtered.isEmpty
                  ? const Center(
                      child: Text(
                        'Nenhum produto encontrado',
                        style: TextStyle(color: AppColors.textSecondary),
                      ),
                    )
                  : GridView.builder(
                      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                      itemCount: filtered.length,
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        mainAxisSpacing: 12,
                        crossAxisSpacing: 12,
                        childAspectRatio: 0.72,
                      ),
                      itemBuilder: (context, index) =>
                          _ProductCard(product: filtered[index]),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(int resultCount) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Produtos', style: ProdutosStyle.titleStyle),
        const SizedBox(height: 4),
        Text('$resultCount ${resultCount == 1 ? 'produto encontrado' : 'produtos encontrados'}',
            style: ProdutosStyle.subtitleStyle),
      ],
    );
  }

  Widget _buildSearchField() {
    return TextField(
      onChanged: (value) => setState(() => _searchQuery = value),
      decoration: ProdutosStyle.searchFieldDecoration(),
    );
  }

  Widget _buildCategoryFilters() {
    return SizedBox(
      height: 38,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        scrollDirection: Axis.horizontal,
        itemCount: _categories.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final category = _categories[index];
          final active = category == _selectedCategory;
          return GestureDetector(
            onTap: () => setState(() => _selectedCategory = category),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              alignment: Alignment.center,
              decoration: ProdutosStyle.categoryChipDecoration(active),
              child: Text(category,
                  style: ProdutosStyle.categoryChipTextStyle(active)),
            ),
          );
        },
      ),
    );
  }

  Widget _buildSortRow() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        children: [
          const Text('Ordenar:', style: ProdutosStyle.sortLabelStyle),
          const SizedBox(width: 8),
          _buildSortChip('Menor preço', _SortOption.menorPreco),
          const SizedBox(width: 8),
          _buildSortChip('Maior economia', _SortOption.maiorEconomia),
        ],
      ),
    );
  }

  Widget _buildSortChip(String label, _SortOption option) {
    final active = _sortOption == option;
    return GestureDetector(
      onTap: () => setState(() => _sortOption = option),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: ProdutosStyle.sortChipDecoration(active),
        child: Text(label, style: ProdutosStyle.sortChipTextStyle(active)),
      ),
    );
  }
}

// TODO: mesma lista de categorias usada na Home e em Promoções — vale
// centralizar isso num lugar só quando o modelo compartilhado existir.
const List<String> _categories = [
  'Todos',
  'Hortifruti',
  'Carnes',
  'Bebidas',
  'Limpeza',
  'Higiene',
];

class _Product {
  final String name;
  final String unit;
  final String category;
  final double bestPrice;
  final String bestMarket;
  final double? oldPrice;
  final int? discountPercent;

  const _Product({
    required this.name,
    required this.unit,
    required this.category,
    required this.bestPrice,
    required this.bestMarket,
    this.oldPrice,
    this.discountPercent,
  });
}

// TODO: preços mock — mesmos valores já usados em Promoções/Comparar
// pros 4 primeiros produtos, pra manter consistência entre as telas.
const List<_Product> _products = [
  _Product(
    name: 'Leite Integral 1L',
    unit: '1L',
    category: 'Bebidas',
    bestPrice: 4.79,
    bestMarket: 'Poupe Bem',
    oldPrice: 5.49,
    discountPercent: 13,
  ),
  _Product(
    name: 'Arroz Branco 5kg',
    unit: '5kg',
    category: 'Mercearia',
    bestPrice: 24.90,
    bestMarket: 'Santana',
    oldPrice: 27.99,
    discountPercent: 11,
  ),
  _Product(
    name: 'Óleo de Soja 900ml',
    unit: '900ml',
    category: 'Mercearia',
    bestPrice: 7.99,
    bestMarket: 'Guarani',
    oldPrice: 9.99,
    discountPercent: 20,
  ),
  _Product(
    name: 'Frango Inteiro',
    unit: 'kg',
    category: 'Carnes',
    bestPrice: 10.99,
    bestMarket: 'Tenda',
    oldPrice: 13.99,
    discountPercent: 21,
  ),
  _Product(
    name: 'Banana Prata',
    unit: 'kg',
    category: 'Hortifruti',
    bestPrice: 4.49,
    bestMarket: 'Unidos',
  ),
  _Product(
    name: 'Detergente',
    unit: '500ml',
    category: 'Limpeza',
    bestPrice: 2.29,
    bestMarket: 'Antoneli',
  ),
  _Product(
    name: 'Sabonete',
    unit: '90g',
    category: 'Higiene',
    bestPrice: 1.99,
    bestMarket: 'Poupe Bem',
  ),
  _Product(
    name: 'Refrigerante 2L',
    unit: '2L',
    category: 'Bebidas',
    bestPrice: 7.49,
    bestMarket: 'Santana',
  ),
];

class _ProductCard extends StatelessWidget {
  final _Product product;

  const _ProductCard({required this.product});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: ProdutosStyle.cardDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              // TODO: trocar por Image.network/Image.asset com a foto real
              AspectRatio(
                aspectRatio: 1.3,
                child: Container(
                  decoration: BoxDecoration(
                    color: AppColors.divider,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Icons.shopping_bag_outlined,
                      color: AppColors.textSecondary, size: 28),
                ),
              ),
              if (product.discountPercent != null)
                Positioned(
                  top: 0,
                  left: 0,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 6, vertical: 3),
                    decoration: ProdutosStyle.discountBadgeDecoration,
                    child: Text('-${product.discountPercent}%',
                        style: ProdutosStyle.discountBadgeTextStyle),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            product.name,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: ProdutosStyle.productNameStyle,
          ),
          const SizedBox(height: 2),
          Text(product.category, style: ProdutosStyle.productCategoryStyle),
          const Spacer(),
          const Text('🏆 Melhor preço', style: ProdutosStyle.bestPriceLabelStyle),
          Text(product.bestMarket, style: ProdutosStyle.bestPriceMarketStyle),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (product.oldPrice != null)
                      Text(
                        'R\$ ${product.oldPrice!.toStringAsFixed(2).replaceAll('.', ',')}',
                        style: ProdutosStyle.oldPriceStyle,
                      ),
                    Text(
                      'R\$ ${product.bestPrice.toStringAsFixed(2).replaceAll('.', ',')}',
                      style: ProdutosStyle.bestPriceValueStyle,
                    ),
                  ],
                ),
              ),
              // TODO: ligar à Lista (adicionar este produto) quando o
              // estado compartilhado entre as telas existir.
              GestureDetector(
                onTap: () {},
                child: Container(
                  width: 30,
                  height: 30,
                  decoration: ProdutosStyle.addButtonDecoration,
                  child: const Icon(Icons.add, color: Colors.white, size: 18),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}