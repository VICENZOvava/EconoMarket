import 'package:flutter/material.dart';
import '../style/colors.dart';
import '../style/perfil_style.dart';

/// Tela de Perfil do usuário.
///
/// TODO: todos os dados (nome, email, economia, listas, mercados
/// favoritos e opções) estão fixos (mock) só pra montar o layout.
/// Trocar pelos dados reais do usuário logado quando o back-end /
/// modelo de dados estiver pronto.
class PerfilPage extends StatelessWidget {
  const PerfilPage({super.key});

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
                    _buildStatsRow(),
                    const SizedBox(height: 16),
                    _buildFavoriteMarketsCard(),
                    const SizedBox(height: 16),
                    _buildMenuList(),
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
      padding: PerfilStyle.headerPadding,
      decoration: PerfilStyle.headerDecoration,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // TODO: trocar por Image.network/CircleAvatar com a foto real
          Container(
            width: 64,
            height: 64,
            decoration: PerfilStyle.avatarDecoration,
            child: const Icon(Icons.person, color: Colors.white, size: 34),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Ana Paula Silva', style: PerfilStyle.nameStyle),
                const SizedBox(height: 2),
                const Text('ana.silva@email.com',
                    style: PerfilStyle.emailStyle),
                const SizedBox(height: 6),
                _buildRating(fullStars: 4, totalStars: 5),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRating({required int fullStars, required int totalStars}) {
    return Row(
      children: [
        ...List.generate(totalStars, (i) {
          final filled = i < fullStars;
          return Icon(
            filled ? Icons.star : Icons.star_border,
            color: AppColors.highlightYellow,
            size: 16,
          );
        }),
        const SizedBox(width: 6),
        const Text('Super Economizador', style: PerfilStyle.ratingLabelStyle),
      ],
    );
  }

  Widget _buildStatsRow() {
    const stats = [
      _StatItem(
          value: 'R\$ 847',
          label: 'Economizados',
          color: AppColors.bestPriceGreen),
      _StatItem(value: '34', label: 'Listas', color: AppColors.bannerBlue),
      _StatItem(
          value: '18%',
          label: 'Média de\ndesconto',
          color: Color(0xFFF9A825)),
    ];

    return Row(
      children: stats
          .map(
            (stat) => Expanded(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 4),
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: PerfilStyle.statCardDecoration,
                child: Column(
                  children: [
                    Text(stat.value,
                        style: PerfilStyle.statValueStyle(stat.color)),
                    const SizedBox(height: 4),
                    Text(
                      stat.label,
                      textAlign: TextAlign.center,
                      style: PerfilStyle.statLabelStyle,
                    ),
                  ],
                ),
              ),
            ),
          )
          .toList(),
    );
  }

  Widget _buildFavoriteMarketsCard() {
    const markets = [
      _FavoriteMarket(
          initials: 'AS', label: 'Assaí', color: AppColors.primaryGreen),
      _FavoriteMarket(
          initials: 'CA', label: 'Carrefour', color: AppColors.bannerBlue),
      _FavoriteMarket(
          initials: 'AT', label: 'Atacadão', color: Color(0xFFFB8C00)),
    ];

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: PerfilStyle.sectionCardDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Mercados favoritos',
              style: PerfilStyle.sectionTitleStyle),
          const SizedBox(height: 14),
          Row(
            children: markets
                .map(
                  (market) => Padding(
                    padding: const EdgeInsets.only(right: 20),
                    child: Column(
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration:
                              PerfilStyle.favoriteMarketBadgeDecoration(
                                  market.color),
                          alignment: Alignment.center,
                          child: Text(market.initials,
                              style: PerfilStyle.favoriteMarketInitialsStyle),
                        ),
                        const SizedBox(height: 6),
                        Text(market.label,
                            style: PerfilStyle.favoriteMarketLabelStyle),
                      ],
                    ),
                  ),
                )
                .toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuList() {
    const items = [
      _MenuItem(
        icon: Icons.receipt_long,
        iconBackground: Color(0xFFFCE4EC),
        title: 'Histórico de listas',
        subtitle: '12 listas criadas',
      ),
      _MenuItem(
        icon: Icons.storefront,
        iconBackground: Color(0xFFE3F2FD),
        title: 'Mercados favoritos',
        subtitle: 'Assaí, Carrefour',
      ),
      _MenuItem(
        icon: Icons.notifications,
        iconBackground: Color(0xFFFFF8E1),
        title: 'Notificações',
        subtitle: 'Promoções habilitadas',
      ),
      _MenuItem(
        icon: Icons.location_on,
        iconBackground: Color(0xFFFFEBEE),
        title: 'Minha região',
        subtitle: 'São Paulo, SP',
      ),
      _MenuItem(
        icon: Icons.lock,
        iconBackground: Color(0xFFFFF3E0),
        title: 'Privacidade e segurança',
        subtitle: null,
      ),
    ];

    return Container(
      width: double.infinity,
      decoration: PerfilStyle.sectionCardDecoration,
      child: Column(
        children: List.generate(items.length, (index) {
          final item = items[index];
          final isLast = index == items.length - 1;
          return Column(
            children: [
              ListTile(
                onTap: () {},
                leading: Container(
                  width: 40,
                  height: 40,
                  decoration:
                      PerfilStyle.menuIconDecoration(item.iconBackground),
                  child:
                      Icon(item.icon, color: AppColors.textPrimary, size: 20),
                ),
                title: Text(item.title, style: PerfilStyle.menuTitleStyle),
                subtitle: item.subtitle != null
                    ? Text(item.subtitle!,
                        style: PerfilStyle.menuSubtitleStyle)
                    : null,
                trailing: const Icon(Icons.chevron_right,
                    color: AppColors.textSecondary),
              ),
              if (!isLast)
                const Divider(height: 1, indent: 16, endIndent: 16),
            ],
          );
        }),
      ),
    );
  }
}

class _StatItem {
  final String value;
  final String label;
  final Color color;

  const _StatItem({
    required this.value,
    required this.label,
    required this.color,
  });
}

class _FavoriteMarket {
  final String initials;
  final String label;
  final Color color;

  const _FavoriteMarket({
    required this.initials,
    required this.label,
    required this.color,
  });
}

class _MenuItem {
  final IconData icon;
  final Color iconBackground;
  final String title;
  final String? subtitle;

  const _MenuItem({
    required this.icon,
    required this.iconBackground,
    required this.title,
    required this.subtitle,
  });
}