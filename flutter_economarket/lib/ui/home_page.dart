import 'package:flutter/material.dart';
import '../style/colors.dart';
import '../style/home_style.dart';

/// Tela inicial do app.
///
/// TODO: os dados abaixo (nome do usuário, mercado mais barato,
/// categorias e produtos em promoção) estão fixos (mock) só pra
/// montar o layout. Trocar pelos dados reais quando o back-end /
/// modelo de dados estiver pronto.
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildOffersBanner(),
                    const SizedBox(height: 16),
                    _buildCheapestMarketCard(),
                    const SizedBox(height: 24),
                    _buildSectionHeader('Categorias', 'Ver todas'),
                    const SizedBox(height: 12),
                    _buildCategoriesList(),
                    const SizedBox(height: 24),
                    _buildSectionHeader('Em promoção 🔥', 'Ver todos'),
                    const SizedBox(height: 12),
                    _buildPromotionsList(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      width: double.infinity,
      padding: HomeStyle.headerPadding,
      decoration: HomeStyle.headerDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // TODO: trocar "Ana Paula" pelo nome do usuário logado
              const Text('Olá, Ana Paula 👋', style: HomeStyle.greetingStyle),
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: Colors.white24,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.notifications_none,
                    color: Colors.white),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Text('Onde vai economizar\nhoje?',
              style: HomeStyle.titleStyle),
          const SizedBox(height: 16),
          _buildSearchField(),
        ],
      ),
    );
  }

  Widget _buildSearchField() {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Pesquisar produto...',
        prefixIcon: const Icon(Icons.search, color: AppColors.textSecondary),
        filled: true,
        fillColor: Colors.white,
        contentPadding:
            const EdgeInsets.symmetric(vertical: 0, horizontal: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
      ),
    );
  }

  Widget _buildOffersBanner() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: HomeStyle.bannerDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: Colors.white24,
              borderRadius: BorderRadius.circular(14),
            ),
            child: const Center(
              child: Text('🥩', style: TextStyle(fontSize: 22)),
            ),
          ),
          const SizedBox(height: 12),
          const Text('Super Ofertas', style: HomeStyle.bannerTitleStyle),
          const SizedBox(height: 4),
          const Text('Carnes com até 25% off',
              style: HomeStyle.bannerSubtitleStyle),
          const SizedBox(height: 14),
          OutlinedButton(
            onPressed: () {},
            style: OutlinedButton.styleFrom(
              foregroundColor: Colors.white,
              side: const BorderSide(color: Colors.white54),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text('Ver ofertas →'),
          ),
          const SizedBox(height: 14),
          // TODO: trocar por um PageView real se o banner virar um carrossel
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(3, (i) {
              final active = i == 1;
              return Container(
                margin: const EdgeInsets.symmetric(horizontal: 3),
                width: active ? 18 : 6,
                height: 6,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(active ? 1 : 0.5),
                  borderRadius: BorderRadius.circular(3),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }

  Widget _buildCheapestMarketCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: HomeStyle.cardDecoration,
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: AppColors.bestPriceBackground,
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Center(
              child: Text('🏆', style: TextStyle(fontSize: 20)),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text('Supermercado mais barato agora',
                    style: TextStyle(
                        fontSize: 12, color: AppColors.textSecondary)),
                SizedBox(height: 2),
                Text('Assaí Atacadista',
                    style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppColors.bestPriceGreen)),
                SizedBox(height: 2),
                Text('Até 23% mais barato hoje',
                    style: TextStyle(
                        fontSize: 12, color: AppColors.bestPriceGreen)),
              ],
            ),
          ),
          const Icon(Icons.chevron_right, color: AppColors.textSecondary),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, String actionLabel) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title,
            style: const TextStyle(fontSize: 17, fontWeight: FontWeight.bold)),
        TextButton(
          onPressed: () {},
          style: TextButton.styleFrom(padding: EdgeInsets.zero),
          child: Text(actionLabel,
              style: const TextStyle(
                  color: AppColors.primaryGreen,
                  fontWeight: FontWeight.w600,
                  fontSize: 13)),
        ),
      ],
    );
  }

  Widget _buildCategoriesList() {
    return SizedBox(
      height: 84,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: _categories.length,
        separatorBuilder: (_, __) => const SizedBox(width: 12),
        itemBuilder: (context, index) {
          final category = _categories[index];
          return Column(
            children: [
              Container(
                width: 56,
                height: 56,
                decoration:
                    HomeStyle.categoryIconDecoration(category.background),
                child: Icon(category.icon, color: AppColors.textPrimary),
              ),
              const SizedBox(height: 6),
              Text(category.label, style: HomeStyle.categoryLabelStyle),
            ],
          );
        },
      ),
    );
  }

  Widget _buildPromotionsList() {
    return SizedBox(
      height: 190,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: _promoPreview.length,
        separatorBuilder: (_, __) => const SizedBox(width: 12),
        itemBuilder: (context, index) =>
            _PromoCard(promo: _promoPreview[index]),
      ),
    );
  }
}

class _Category {
  final String label;
  final IconData icon;
  final Color background;

  const _Category(this.label, this.icon, this.background);
}

const List<_Category> _categories = [
  _Category('Hortifruti', Icons.eco, Color(0xFFDCEFE1)),
  _Category('Carnes', Icons.kebab_dining, Color(0xFFFBDDDD)),
  _Category('Bebidas', Icons.local_drink, Color(0xFFDDEAFB)),
  _Category('Limpeza', Icons.cleaning_services, Color(0xFFEDE0F7)),
  _Category('Higiene', Icons.soap, Color(0xFFFCE0EE)),
  _Category('Padaria', Icons.bakery_dining, Color(0xFFFCE9D6)),
];

class _PromoPreview {
  final String name;
  final String market;
  final double oldPrice;
  final double newPrice;
  final int discountPercent;

  const _PromoPreview({
    required this.name,
    required this.market,
    required this.oldPrice,
    required this.newPrice,
    required this.discountPercent,
  });
}

const List<_PromoPreview> _promoPreview = [
  _PromoPreview(
    name: 'Leite Integral 1L',
    market: 'Carrefour',
    oldPrice: 5.49,
    newPrice: 4.79,
    discountPercent: 13,
  ),
  _PromoPreview(
    name: 'Arroz Branco 5kg',
    market: 'Extra',
    oldPrice: 27.99,
    newPrice: 24.90,
    discountPercent: 11,
  ),
];

class _PromoCard extends StatelessWidget {
  final _PromoPreview promo;

  const _PromoCard({required this.promo});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 140,
      decoration: HomeStyle.cardDecoration,
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              // TODO: trocar por Image.network/Image.asset com a foto real
              Container(
                height: 90,
                width: double.infinity,
                color: AppColors.divider,
                child: const Icon(Icons.shopping_bag_outlined,
                    color: AppColors.textSecondary, size: 32),
              ),
              Positioned(
                top: 0,
                left: 0,
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: HomeStyle.discountBadgeDecoration,
                  child: Text('-${promo.discountPercent}%',
                      style: HomeStyle.discountBadgeTextStyle),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  promo.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                      fontSize: 12, fontWeight: FontWeight.w600),
                ),
                const SizedBox(height: 2),
                Text(promo.market,
                    style: const TextStyle(
                        fontSize: 10, color: AppColors.textSecondary)),
                const SizedBox(height: 4),
                Text(
                  'R\$ ${promo.oldPrice.toStringAsFixed(2).replaceAll('.', ',')}',
                  style: const TextStyle(
                    fontSize: 11,
                    color: AppColors.priceStrikethrough,
                    decoration: TextDecoration.lineThrough,
                  ),
                ),
                Text(
                  'R\$ ${promo.newPrice.toStringAsFixed(2).replaceAll('.', ',')}',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: AppColors.promotionRed,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}