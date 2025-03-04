import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Supermarché',
    category: 'Alimentation',
    amount: -82.50,
    date: '2024-02-20',
    icon: 'cart',
  },
  {
    id: '2',
    title: 'Salaire',
    category: 'Revenu',
    amount: 2800.00,
    date: '2024-02-19',
    icon: 'cash',
  },
  {
    id: '3',
    title: 'Netflix',
    category: 'Loisirs',
    amount: -15.99,
    date: '2024-02-18',
    icon: 'film',
  },
];

export default function TransactionsScreen() {
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionCard}>
      <View style={[styles.iconContainer, { backgroundColor: item.amount > 0 ? '#DCFCE7' : '#FEE2E2' }]}>
        <Ionicons 
          name={item.icon as any} 
          size={24} 
          color={item.amount > 0 ? '#22C55E' : '#EF4444'} 
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <Text style={[styles.amount, { color: item.amount > 0 ? '#22C55E' : '#EF4444' }]}>
        {item.amount > 0 ? '+' : ''}{item.amount.toFixed(2)} €
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Ce mois</Text>
          <Ionicons name="chevron-down" size={20} color="#64748B" />
        </View>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  filterText: {
    color: '#64748B',
    marginRight: 4,
  },
  list: {
    padding: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  category: {
    color: '#64748B',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
