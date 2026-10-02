import 'package:flutter/material.dart';
import '../style/colors.dart';
import '../style/comparar_style.dart';

/// Tela de Comparação de Preços (RF004 - comparação de preços,
/// RF008 - resumo geral e gráfico comparativo).
///
/// TODO: todos os dados (mercados, totais e preços por produto) estão
/// fixos (mock) só pra montar o layout. Trocar pelos dados reais da
/// lista de compras do usuário quando o back-end / modelo de dados
/// estiver pronto — ver observação de arquitetura no fim do arquivo.
class CompararPage extends StatelessWidget {
  const CompararPage({super.key});

  @override
  Widget build(BuildContext context) {
    final bestMarket = _marketTotals.reduce(
      (a, b) => a.total < b.total ? a : b,
    );
    final worstMarket = _marketTotals.reduce(
      (a, b) => a.total > b.total ? a : b,
    );
    final economy = worstMarket.total - bestMarket.total;

    return Scaffold(
      backgroundColor: AppColors.cardWhite,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildTitle(),
              const SizedBox(height: 16),
              _buildBestMarketCard(bestMarket, economy),
              const SizedBox(height: 16),
              _buildMarketTotalsCard(),
              const SizedBox(height: 16),
              _buildProductsCard(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTitle() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Comparar Preços', style: CompararStyle.titleStyle),
        const SizedBox(height: 4),
        Text(
          '${_products.length} produtos · ${_marketTotals.length} supermercados',
          style: CompararStyle.subtitleStyle,
        ),
      ],
    );
  }

  Widget _buildBestMarketCard(_MarketTotal bestMarket, double economy) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: CompararStyle.bestMarketCardDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Center(
                  child: Text('🏆', style: TextStyle(fontSize: 18)),
                ),
              ),
              const SizedBox(width: 10),
              const Expanded(
                child: Text('Mais econômico para sua lista',
                    style: CompararStyle.bestMarketLabelStyle),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(bestMarket.name, style: CompararStyle.bestMarketNameStyle),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: CompararStyle.totalCardDecoration,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Total da compra',
                          style: CompararStyle.innerStatLabelStyle),
                      const SizedBox(height: 4),
                      Text(_formatPrice(bestMarket.total),
                          style: CompararStyle.innerStatValueStyle(
                              Colors.white)),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: CompararStyle.economyCardDecoration,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Você economiza',
                          style: CompararStyle.innerStatLabelStyle),
                      const SizedBox(height: 4),
                      Text(_formatPrice(economy),
                          style: CompararStyle.innerStatValueStyle(
                              AppColors.highlightYellow)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMarketTotalsCard() {
    // Confirmado no print real: o mercado mais barato aparece com a
    // barra cheia (verde) e cada mercado seguinte, em ordem crescente
    // de preço, aparece com uma barra proporcionalmente mais curta —
    // não é proporcional ao valor em si, é um ranking visual.
    final sortedMarkets = [..._marketTotals]
      ..sort((a, b) => a.total.compareTo(b.total));

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: CompararStyle.sectionCardDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Total por supermercado',
              style: CompararStyle.sectionTitleStyle),
          const SizedBox(height: 16),
          ...List.generate(sortedMarkets.length, (index) {
            final market = sortedMarkets[index];
            final isBest = index == 0;
            final widthFactor = (1 - index * 0.16).clamp(0.3, 1.0);
            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(_formatPrice(market.total),
                      style: CompararStyle.barValueStyle(isBest)),
                  const SizedBox(height: 4),
                  LayoutBuilder(
                    builder: (context, constraints) {
                      return Container(
                        height: 6,
                        width: constraints.maxWidth * widthFactor,
                        decoration: BoxDecoration(
                          color: isBest
                              ? CompararStyle.barBestColor
                              : CompararStyle.barDefaultColor,
                          borderRadius: BorderRadius.circular(3),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 4),
                  Text(market.name, style: CompararStyle.barLabelStyle),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }

  Widget _buildProductsCard() {
    return Container(
      width: double.infinity,
      decoration: CompararStyle.sectionCardDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: Text('Preços por produto',
                style: CompararStyle.sectionTitleStyle),
          ),
          ...List.generate(_products.length, (index) {
            final product = _products[index];
            final isLast = index == _products.length - 1;
            return Column(
              children: [
                _ProductComparisonRow(product: product),
                if (!isLast)
                  const Divider(height: 1, indent: 16, endIndent: 16),
              ],
            );
          }),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}

String _formatPrice(double value) {
  return 'R\$ ${value.toStringAsFixed(2).replaceAll('.', ',')}';
}

class _MarketTotal {
  final String name;
  final double total;

  const _MarketTotal({required this.name, required this.total});
}

// TODO: nomes de mercado provisórios — confirmar/ajustar com a lista
// real de supermercados cadastrados (RF002) antes da entrega final.
const List<_MarketTotal> _marketTotals = [
  _MarketTotal(name: 'Santana', total: 36.96),
  _MarketTotal(name: 'Poupe Bem', total: 38.47),
  _MarketTotal(name: 'Guarani', total: 44.17),
  _MarketTotal(name: 'Tenda', total: 47.67),
  _MarketTotal(name: 'Unidos', total: 49.96),
];

class _MarketPrice {
  final String market;
  final double price;
  final double? oldPrice;
  final int? discountPercent;

  const _MarketPrice({
    required this.market,
    required this.price,
    this.oldPrice,
    this.discountPercent,
  });
}

class _ProductComparison {
  final String name;
  final String unit;
  final int quantity;
  final List<_MarketPrice> prices;

  const _ProductComparison({
    required this.name,
    required this.unit,
    required this.quantity,
    required this.prices,
  });
}

// TODO: mesma observação de nomes de mercado acima se aplica aqui.
const List<_ProductComparison> _products = [
  _ProductComparison(
    name: 'Leite Integral',
    unit: '1L',
    quantity: 1,
    prices: [
      _MarketPrice(market: 'Santana', price: 4.49),
      _MarketPrice(market: 'Poupe Bem', price: 4.59),
      _MarketPrice(
        market: 'Guarani',
        price: 4.79,
        oldPrice: 5.49,
        discountPercent: 13,
      ),
      _MarketPrice(market: 'Tenda', price: 5.29),
      _MarketPrice(market: 'Unidos', price: 5.49),
    ],
  ),
  _ProductComparison(
    name: 'Arroz Branco',
    unit: '5kg',
    quantity: 1,
    prices: [
      _MarketPrice(market: 'Santana', price: 26.50),
      _MarketPrice(market: 'Poupe Bem', price: 25.80),
      _MarketPrice(market: 'Guarani', price: 27.10),
      _MarketPrice(
        market: 'Tenda',
        price: 24.90,
        oldPrice: 27.99,
        discountPercent: 11,
      ),
      _MarketPrice(market: 'Unidos', price: 28.40),
    ],
  ),
  _ProductComparison(
    name: 'Óleo de Soja',
    unit: '900ml',
    quantity: 1,
    prices: [
      _MarketPrice(market: 'Santana', price: 8.49),
      _MarketPrice(market: 'Poupe Bem', price: 8.20),
      _MarketPrice(
        market: 'Guarani',
        price: 7.99,
        oldPrice: 9.99,
        discountPercent: 20,
      ),
      _MarketPrice(market: 'Tenda', price: 8.99),
      _MarketPrice(market: 'Unidos', price: 9.20),
    ],
  ),
  _ProductComparison(
    name: 'Frango Inteiro',
    unit: 'kg',
    quantity: 1,
    prices: [
      _MarketPrice(
        market: 'Santana',
        price: 10.99,
        oldPrice: 13.99,
        discountPercent: 21,
      ),
      _MarketPrice(market: 'Unidos', price: 11.49),
      _MarketPrice(market: 'Guarani', price: 12.20),
      _MarketPrice(market: 'Tenda', price: 12.80),
      _MarketPrice(market: 'Unidos', price: 13.50),
    ],
  ),
];

class _ProductComparisonRow extends StatelessWidget {
  final _ProductComparison product;

  const _ProductComparisonRow({required this.product});

  @override
  Widget build(BuildContext context) {
    final bestPrice = product.prices
        .map((p) => p.price)
        .reduce((a, b) => a < b ? a : b);

    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              // TODO: trocar por Image.network/Image.asset com a foto real
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppColors.divider,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.shopping_bag_outlined,
                    color: AppColors.textSecondary, size: 20),
              ),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(product.name, style: CompararStyle.productNameStyle),
                  Text('${product.unit} · ${product.quantity}x',
                      style: CompararStyle.productSubtitleStyle),
                ],
              ),
            ],
          ),
          const SizedBox(height: 10),
          SizedBox(
            height: 78,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: product.prices.length,
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                final price = product.prices[index];
                final isBest = price.price == bestPrice;
                return _PriceChip(price: price, isBest: isBest);
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _PriceChip extends StatelessWidget {
  final _MarketPrice price;
  final bool isBest;

  const _PriceChip({required this.price, required this.isBest});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 110,
      padding: const EdgeInsets.all(8),
      decoration: CompararStyle.priceCardDecoration(isBest),
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(price.market,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: CompararStyle.priceCardMarketStyle),
              const SizedBox(height: 4),
              if (price.oldPrice != null)
                Text(_formatPrice(price.oldPrice!),
                    style: CompararStyle.priceCardOldPriceStyle),
              Text(_formatPrice(price.price),
                  style: CompararStyle.priceCardNewPriceStyle(isBest)),
              if (isBest) ...[
                const SizedBox(height: 2),
                const Text('🏆 Melhor preço',
                    style: CompararStyle.bestPriceTagStyle),
              ],
            ],
          ),
          if (price.discountPercent != null)
            Positioned(
              top: -8,
              right: -8,
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                decoration: CompararStyle.discountBadgeDecoration,
                child: Text('-${price.discountPercent}%',
                    style: CompararStyle.discountBadgeTextStyle),
              ),
            ),
        ],
      ),
    );
  }
}