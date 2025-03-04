import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Member {
  id: string;
  name: string;
  avatar: string;
}

interface SharedBudget {
  id: string;
  name: string;
  members: Member[];
  totalBudget: number;
  currentSpent: number;
}

const sharedBudgets: SharedBudget[] = [
  {
    id: '1',
    name: 'Colocation',
    members: [
      { id: '1', name: 'Thomas', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400' },
      { id: '2', name: 'Marie', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    ],
    totalBudget: 1200,
    currentSpent: 850,
  },
  {
    id: '2',
    name: 'Vacances été',
    members: [
      { id: '1', name: 'Thomas', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400' },
      { id: '3', name: 'Pierre', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
      { id: '4', name: 'Sophie', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400' },
    ],
    totalBudget: 2000,
    currentSpent: 1200,
  },
];

export default function BudgetShareScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderBudgetCard = ({ item }: { item: SharedBudget }) => (
    <TouchableOpacity style={styles.budgetCard}>
      <View style={styles.budgetHeader}>
        <Text style={styles.budgetName}>{item.name}</Text>
        <View style={styles.membersAvatars}>
          {item.members.map((member, index) => (
            <Image
              key={member.id}
              source={{ uri: member.avatar }}
              style={[
                styles.memberAvatar,
                { marginLeft: index > 0 ? -15 : 0 },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.budgetProgress}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(item.currentSpent / item.totalBudget) * 100}%` },
            ]}
          />
        </View>
        <View style={styles.budgetStats}>
          <Text style={styles.spentAmount}>{item.currentSpent} €</Text>
          <Text style={styles.totalAmount}>/ {item.totalBudget} €</Text>
        </View>
      </View>

      <View style={styles.budgetActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle-outline" size={20} color="#6366F1" />
          <Text style={styles.actionText}>Ajouter une dépense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="people-outline" size={20} color="#6366F1" />
          <Text style={styles.actionText}>Gérer les membres</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budgets partagés</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un budget"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={sharedBudgets}
        renderItem={renderBudgetCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.budgetList}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  budgetList: {
    padding: 16,
  },
  budgetCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  membersAvatars: {
    flexDirection: 'row',
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  budgetProgress: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  budgetStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  spentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  totalAmount: {
    fontSize: 16,
    color: '#64748B',
  },
  budgetActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: {
    marginLeft: 4,
    color: '#6366F1',
    fontWeight: '500',
  },
});
