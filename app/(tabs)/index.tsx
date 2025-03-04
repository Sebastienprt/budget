import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProfileAvatar from '../../components/ProfileAvatar';
import ExpenseForm from '../../components/ExpenseForm';
import IncomeForm from '../../components/IncomeForm';
import ExpenseList, { Expense } from '../../components/ExpenseList';

// Mock user data
const userData = {
  name: 'Thomas Dubois',
  photoUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400',
  initialBalance: 2450.00, // Initial balance before any transactions
};

// Mock initial expenses
const initialExpenses: Expense[] = [
  {
    id: '1',
    amount: 42.50,
    date: new Date('2024-02-20'),
    category: 'food',
    description: 'Courses au supermarché',
    isIncome: false,
  },
  {
    id: '2',
    amount: 15.99,
    date: new Date('2024-02-18'),
    category: 'entertainment',
    description: 'Abonnement Netflix',
    isIncome: false,
  },
  {
    id: '3',
    amount: 35.00,
    date: new Date('2024-02-15'),
    category: 'transport',
    description: 'Essence',
    isIncome: false,
  },
];

// Mock initial incomes
const initialIncomes: Expense[] = [
  {
    id: '4',
    amount: 2800.00,
    date: new Date('2024-02-01'),
    category: 'salary',
    description: 'Salaire mensuel',
    isIncome: true,
  },
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Expense[]>([
    ...initialExpenses,
    ...initialIncomes
  ]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(userData.initialBalance);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  // Calculate balance based on all transactions
  useEffect(() => {
    // Start with initial balance
    let balance = userData.initialBalance;
    let incomeSum = 0;
    let expenseSum = 0;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Process all transactions
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const isCurrentMonth = 
        transactionDate.getMonth() === currentMonth && 
        transactionDate.getFullYear() === currentYear;
      
      if (transaction.isIncome) {
        balance += transaction.amount;
        if (isCurrentMonth) {
          incomeSum += transaction.amount;
        }
      } else {
        balance -= transaction.amount;
        if (isCurrentMonth) {
          expenseSum += transaction.amount;
        }
      }
    });

    setCurrentBalance(balance);
    setMonthlyIncome(incomeSum);
    setMonthlyExpenses(expenseSum);
  }, [transactions]);

  const addTransaction = (newTransaction: Omit<Expense, 'id'>) => {
    const transaction: Expense = {
      ...newTransaction,
      id: Date.now().toString(), // Simple ID generation
      isIncome: false, // Default to expense
    };
    
    setTransactions(prev => [transaction, ...prev]);
    setShowExpenseForm(false);
  };

  const addIncome = (newIncome: Omit<Expense, 'id'>) => {
    const income: Expense = {
      ...newIncome,
      id: Date.now().toString(),
      isIncome: true,
    };
    setTransactions(prev => [income, ...prev]);
    setShowIncomeForm(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  // Filter only expenses for the expense list
  const expenses = transactions.filter(transaction => !transaction.isIncome);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#4F46E5']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Bonjour, Thomas</Text>
          </View>
          <ProfileAvatar 
            imageUrl={userData.photoUrl}
            name={userData.name}
            size={40}
            showName={true}
          />
        </View>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Solde actuel</Text>
          <Text style={styles.balance}>{currentBalance.toFixed(2)} €</Text>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="trending-up" size={24} color="#10B981" />
          <Text style={styles.statAmount}>+{monthlyIncome.toFixed(2)} €</Text>
          <Text style={styles.statLabel}>Revenus du mois</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trending-down" size={24} color="#EF4444" />
          <Text style={styles.statAmount}>-{monthlyExpenses.toFixed(2)} €</Text>
          <Text style={styles.statLabel}>Dépenses du mois</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Gestion des dépenses</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.addButton, styles.incomeButton]}
              onPress={() => setShowIncomeForm(true)}
            >
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Revenu</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowExpenseForm(!showExpenseForm)}
            >
              <Ionicons 
                name={showExpenseForm ? "close" : "add"} 
                size={20} 
                color="#fff" 
              />
              <Text style={styles.addButtonText}>
                {showExpenseForm ? "Annuler" : "Dépense"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showExpenseForm && (
          <ExpenseForm onSubmit={addTransaction} />
        )}

        {showIncomeForm && (
          <IncomeForm
            onSubmit={addIncome}
            onCancel={() => setShowIncomeForm(false)}
          />
        )}

        <ExpenseList 
          expenses={expenses}
          onDelete={deleteTransaction}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objectifs en cours</Text>
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Ionicons name="car" size={24} color="#6366F1" />
            <Text style={styles.goalTitle}>Voiture</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '65%' }]} />
          </View>
          <Text style={styles.goalProgress}>6 500 € / 10 000 €</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dernières transactions</Text>
        {transactions.slice(0, 3).map((transaction, index) => (
          <View key={transaction.id} style={styles.transaction}>
            <View style={[
              styles.transactionIcon,
              { backgroundColor: transaction.isIncome ? '#DCFCE7' : '#EEF2FF' }
            ]}>
              <Ionicons 
                name={transaction.isIncome ? "wallet" : "cart"} 
                size={20} 
                color={transaction.isIncome ? "#10B981" : "#6366F1"} 
              />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>{transaction.description}</Text>
              <Text style={styles.transactionDate}>
                {new Date(transaction.date).toLocaleDateString('fr-FR')}
              </Text>
            </View>
            <Text style={[
              styles.transactionAmount,
              { color: transaction.isIncome ? '#10B981' : '#EF4444' }
            ]}>
              {transaction.isIncome ? '+' : '-'}{transaction.amount.toFixed(2)} €
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  balanceContainer: {
    marginTop: 20,
  },
  balanceLabel: {
    color: '#E0E7FF',
    fontSize: 16,
  },
  balance: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  statLabel: {
    color: '#64748B',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  incomeButton: {
    backgroundColor: '#10B981',
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: '500',
  },
  goalCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginTop: 12,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  goalProgress: {
    color: '#64748B',
    marginTop: 8,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDate: {
    color: '#64748B',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});
