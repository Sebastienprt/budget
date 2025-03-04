import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Member {
  id: string;
  name: string;
  avatar: string;
}

const members: Member[] = [
  { id: '1', name: 'Thomas', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400' },
  { id: '2', name: 'Marie', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
  { id: '3', name: 'Pierre', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
];

export default function ExpenseSplitScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState(members.map(m => m.id));

  const toggleMember = (memberId: string) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const splitAmount = parseFloat(amount || '0') / (selectedMembers.length || 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Partager une dépense</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Montant</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Ex: Courses, Restaurant..."
          />
        </View>

        <View style={styles.membersSection}>
          <Text style={styles.label}>Participants</Text>
          <View style={styles.membersList}>
            {members.map(member => (
              <TouchableOpacity
                key={member.id}
                style={[
                  styles.memberCard,
                  selectedMembers.includes(member.id) && styles.memberCardSelected,
                ]}
                onPress={() => toggleMember(member.id)}>
                <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
                <Text style={[
                  styles.memberName,
                  selectedMembers.includes(member.id) && styles.memberNameSelected,
                ]}>{member.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.splitPreview}>
          <Text style={styles.splitTitle}>Répartition</Text>
          {selectedMembers.map(memberId => {
            const member = members.find(m => m.id === memberId);
            if (!member) return null;
            return (
              <View key={member.id} style={styles.splitRow}>
                <View style={styles.splitMember}>
                  <Image source={{ uri: member.avatar }} style={styles.splitAvatar} />
                  <Text style={styles.splitName}>{member.name}</Text>
                </View>
                <Text style={styles.splitAmount}>{splitAmount.toFixed(2)} €</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Partager la dépense</Text>
        </TouchableOpacity>
      </View>
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
  form: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 16,
  },
  membersSection: {
    marginBottom: 20,
  },
  membersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  memberCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  memberCardSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  memberNameSelected: {
    color: '#6366F1',
  },
  splitPreview: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  splitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  splitMember: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  splitAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  splitName: {
    fontSize: 16,
    color: '#1E293B',
  },
  splitAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
