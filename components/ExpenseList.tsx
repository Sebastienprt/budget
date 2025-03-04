import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Modal,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Expense {
  id: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
  receipt?: string;
  isIncome?: boolean;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const categoryIcons: Record<string, string> = {
  food: 'restaurant',
  transport: 'car',
  entertainment: 'game-controller',
  housing: 'home',
  shopping: 'cart',
  health: 'medical',
  salary: 'wallet',
  other: 'ellipsis-horizontal',
};

const categoryNames: Record<string, string> = {
  food: 'Alimentation',
  transport: 'Transport',
  entertainment: 'Loisirs',
  housing: 'Logement',
  shopping: 'Shopping',
  health: 'Santé',
  salary: 'Salaire',
  other: 'Autre',
};

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Sort expenses
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else {
      return sortOrder === 'asc'
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    }
  });

  // Paginate expenses
  const paginatedExpenses = sortedExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const toggleSort = (field: 'date' | 'amount' | 'category') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const confirmDelete = (id: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) {
        onDelete(id);
      }
    } else {
      setDeleteConfirmId(id);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <View style={styles.expenseIconContainer}>
        <Ionicons 
          name={categoryIcons[item.category] as any || 'help-circle'} 
          size={24} 
          color="#6366F1" 
        />
      </View>
      <View style={styles.expenseDetails}>
        <Text style={styles.expenseCategory}>
          {categoryNames[item.category] || item.category}
        </Text>
        <Text style={styles.expenseDescription} numberOfLines={1}>
          {item.description || 'Pas de description'}
        </Text>
        <Text style={styles.expenseDate}>{formatDate(item.date)}</Text>
      </View>
      <View style={styles.expenseAmount}>
        <Text style={styles.expenseAmountText}>
          {item.amount.toFixed(2)} €
        </Text>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => confirmDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dépenses récentes</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity 
            style={[styles.sortButton, sortBy === 'date' && styles.activeSortButton]} 
            onPress={() => toggleSort('date')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'date' && styles.activeSortButtonText]}>
              Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortButton, sortBy === 'amount' && styles.activeSortButton]} 
            onPress={() => toggleSort('amount')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'amount' && styles.activeSortButtonText]}>
              Montant {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortButton, sortBy === 'category' && styles.activeSortButton]} 
            onPress={() => toggleSort('category')}
          >
            <Text style={[styles.sortButtonText, sortBy === 'category' && styles.activeSortButtonText]}>
              Catégorie {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {expenses.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={48} color="#CBD5E1" />
          <Text style={styles.emptyStateText}>Aucune dépense enregistrée</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={paginatedExpenses}
            renderItem={renderExpenseItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />

          {totalPages > 1 && (
            <View style={styles.pagination}>
              <TouchableOpacity 
                style={[styles.pageButton, currentPage === 1 && styles.disabledPageButton]}
                onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <Ionicons name="chevron-back" size={16} color={currentPage === 1 ? "#CBD5E1" : "#6366F1"} />
              </TouchableOpacity>
              
              <Text style={styles.pageInfo}>
                Page {currentPage} sur {totalPages}
              </Text>
              
              <TouchableOpacity 
                style={[styles.pageButton, currentPage === totalPages && styles.disabledPageButton]}
                onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <Ionicons name="chevron-forward" size={16} color={currentPage === totalPages ? "#CBD5E1" : "#6366F1"} />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {/* Delete Confirmation Modal for native platforms */}
      <Modal
        visible={!!deleteConfirmId}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmer la suppression</Text>
            <Text style={styles.modalText}>
              Êtes-vous sûr de vouloir supprimer cette dépense ?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteConfirmId(null)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.deleteModalButton]}
                onPress={() => {
                  if (deleteConfirmId) {
                    onDelete(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }
                }}
              >
                <Text style={styles.deleteModalButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  sortButtons: {
    flexDirection: 'row',
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#F1F5F9',
  },
  activeSortButton: {
    backgroundColor: '#EEF2FF',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#64748B',
  },
  activeSortButtonText: {
    color: '#6366F1',
    fontWeight: '500',
  },
  list: {
    paddingBottom: 8,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  expenseIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseDetails: {
    flex: 1,
    marginLeft: 12,
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  expenseDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  expenseDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  expenseAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginRight: 12,
  },
  deleteButton: {
    padding: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  pageButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledPageButton: {
    backgroundColor: '#F8FAFC',
  },
  pageInfo: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#64748B',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
  },
  cancelButtonText: {
    color: '#64748B',
    fontWeight: '500',
  },
  deleteModalButton: {
    backgroundColor: '#FEE2E2',
  },
  deleteModalButtonText: {
    color: '#EF4444',
    fontWeight: '500',
  },
});
