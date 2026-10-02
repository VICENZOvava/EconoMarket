import 'package:flutter/material.dart';
import '../style/colors.dart';
import '../style/lista_style.dart';

/// Tela "Minha Lista" (RF005 - Lista de compras e cálculo do total).
///
/// Sem protótipo oficial pra essa tela ainda — desenho baseado no
/// requisito RF005 e no padrão visual já usado em Promoções e
/// Comparar. Ajuste livremente quando o grupo definir o layout
/// oficial.
///
/// TODO: os itens estão em estado local (mock) só pra montar a
/// interação de quantidade/remoção. Trocar por um gerenciamento de
/// estado compartilhado (Provider/Bloc/Riverpod, a critério do
/// grupo) quando a lista precisar persistir ou alimentar a tela de
/// Comparar com os itens reais escolhidos pelo usuário.
class ListaPage extends StatefulWidget {
  const ListaPage({super.key});

  @override
  State<ListaPage> createState() => _ListaPageState();
}

class _ListaPageState extends State<ListaPage> {
  final List<_ListItem> _items = [
    _ListItem(name: 'Leite Integral', unit: '1L', quantity: 2),
    _ListItem(name: 'Arroz Branco', unit: '5kg', quantity: 1),
    _ListItem(name: 'Óleo de Soja', unit: '900ml', quantity: 1),
    _ListItem(name: 'Frango Inteiro', unit: 'kg', quantity: 1),
  ];

  int get _totalItems => _items.fold(0, (sum, item) => sum + item.quantity);

  void _increment(_ListItem item) {
    setState(() => item.quantity++);
  }

  void _decrement(_ListItem item) {
    setState(() {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        _items.remove(item);
      }
    });
  }

  void _remove(_ListItem item) {
    setState(() => _items.remove(item));
  }

  void _clearList() {
    setState(() => _items.clear());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.cardWhite,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 0),
              child: _buildHeader(),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: _items.isEmpty
                  ? _buildEmptyState()
                  : ListView.separated(
                      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                      itemCount: _items.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 12),
                      itemBuilder: (context, index) => _ListItemCard(
                        item: _items[index],
                        onIncrement: () => _increment(_items[index]),
                        onDecrement: () => _decrement(_items[index]),
                        onRemove: () => _remove(_items[index]),
                      ),
                    ),
            ),
            if (_items.isNotEmpty) _buildFooter(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Minha Lista', style: ListaStyle.titleStyle),
            const SizedBox(height: 4),
            Text(
              _items.isEmpty
                  ? 'Nenhum item adicionado'
                  : '$_totalItems ${_totalItems == 1 ? 'item' : 'itens'} na lista',
              style: ListaStyle.subtitleStyle,
            ),
          ],
        ),
        if (_items.isNotEmpty)
          TextButton(
            onPressed: _clearList,
            style: TextButton.styleFrom(padding: EdgeInsets.zero),
            child:
                const Text('Limpar lista', style: ListaStyle.clearActionStyle),
          ),
      ],
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.list_alt_outlined,
                size: 56, color: AppColors.divider),
            const SizedBox(height: 16),
            const Text('Sua lista está vazia',
                style: ListaStyle.emptyTitleStyle),
            const SizedBox(height: 6),
            const Text(
              'Adicione produtos pra comparar os preços entre os mercados.',
              textAlign: TextAlign.center,
              style: ListaStyle.emptySubtitleStyle,
            ),
            const SizedBox(height: 20),
            _buildAddButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildFooter() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
      decoration: ListaStyle.footerDecoration,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildAddButton(),
          const SizedBox(height: 16),
          // TODO: ligar a navegação pra aba "Comparar" (índice 2 no
          // MainNavigation, em main.dart) quando esse botão for
          // tocado — hoje ele não faz nada.
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.bar_chart),
              label: const Text('Comparar preços'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAddButton() {
    return GestureDetector(
      // TODO: abrir a tela de Produtos (busca/catálogo) pra escolher
      // o que adicionar à lista.
      onTap: () {},
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 12),
        alignment: Alignment.center,
        decoration: ListaStyle.addButtonDecoration,
        child: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.add, color: AppColors.primaryGreen, size: 18),
            SizedBox(width: 6),
            Text('Adicionar produto', style: ListaStyle.addButtonTextStyle),
          ],
        ),
      ),
    );
  }
}

class _ListItem {
  final String name;
  final String unit;
  int quantity;

  _ListItem({required this.name, required this.unit, required this.quantity});
}

class _ListItemCard extends StatelessWidget {
  final _ListItem item;
  final VoidCallback onIncrement;
  final VoidCallback onDecrement;
  final VoidCallback onRemove;

  const _ListItemCard({
    required this.item,
    required this.onIncrement,
    required this.onDecrement,
    required this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: ListaStyle.itemCardDecoration,
      child: Row(
        children: [
          // TODO: trocar por Image.network/Image.asset com a foto real
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: AppColors.divider,
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(Icons.shopping_bag_outlined,
                color: AppColors.textSecondary, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(item.name, style: ListaStyle.itemNameStyle),
                Text(item.unit, style: ListaStyle.itemUnitStyle),
              ],
            ),
          ),
          _buildQuantityStepper(),
          IconButton(
            onPressed: onRemove,
            icon: const Icon(Icons.delete_outline,
                color: AppColors.textSecondary, size: 20),
            splashRadius: 20,
          ),
        ],
      ),
    );
  }

  Widget _buildQuantityStepper() {
    return Container(
      decoration: ListaStyle.quantityStepperDecoration,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            onPressed: onDecrement,
            icon: const Icon(Icons.remove, size: 16),
            constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
            padding: EdgeInsets.zero,
            splashRadius: 16,
          ),
          SizedBox(
            width: 22,
            child: Text(
              '${item.quantity}',
              textAlign: TextAlign.center,
              style: ListaStyle.quantityTextStyle,
            ),
          ),
          IconButton(
            onPressed: onIncrement,
            icon: const Icon(Icons.add, size: 16),
            constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
            padding: EdgeInsets.zero,
            splashRadius: 16,
          ),
        ],
      ),
    );
  }
}