import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ExpenseFormProps {
  onSubmit: (expense: {
    amount: number;
    date: Date;
    category: string;
    description: string;
    receipt?: string;
  }) => void;
}

const categories = [
  { id: 'food', name: 'Alimentation', icon: 'restaurant' },
  { id: 'transport', name: 'Transport', icon: 'car' },
  { id: 'entertainment', name: 'Loisirs', icon: 'game-controller' },
  { id: 'housing', name: 'Logement', icon: 'home' },
  { id: 'shopping', name: 'Shopping', icon: 'cart' },
  { id: 'health', name: 'Santé', icon: 'medical' },
  { id: 'other', name: 'Autre', icon: 'ellipsis-horizontal' },
];

export default function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [receipt, setReceipt] = useState<string | undefined>();
  const [showCategories, setShowCategories] = useState(false);

  const handleSubmit = () => {
    if (!amount || !category) {
      // Simple validation
      return;
    }

    onSubmit({
      amount: parseFloat(amount),
      date,
      category,
      description,
      receipt,
    });

    // Reset form
    setAmount('');
    setDate(new Date());
    setCategory('');
    setDescription('');
    setReceipt(undefined);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const selectedCategoryName = category 
    ? categories.find(c => c.id === category)?.name 
    : 'Sélectionner une catégorie';

  const selectedCategoryIcon = category 
    ? categories.find(c => c.id === category)?.icon 
    : 'list';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle dépense</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Montant (€)</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{formatDate(date)}</Text>
          <Ionicons name="calendar" size={20} color="#64748B" />
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Catégorie</Text>
        <TouchableOpacity 
          style={styles.categorySelector}
          onPress={() => setShowCategories(!showCategories)}
        >
          <View style={styles.selectedCategory}>
            <Ionicons name={selectedCategoryIcon as any} size={20} color="#6366F1" />
            <Text style={styles.categoryText}>{selectedCategoryName}</Text>
          </View>
          <Ionicons 
            name={showCategories ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#64748B" 
          />
        </TouchableOpacity>
        
        {showCategories && (
          <View style={styles.categoriesList}>
            <ScrollView style={{ maxHeight: 200 }}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryItem,
                    category === cat.id && styles.selectedCategoryItem
                  ]}
                  onPress={() => {
                    setCategory(cat.id);
                    setShowCategories(false);
                  }}
                >
                  <Ionicons 
                    name={cat.icon as any} 
                    size={20} 
                    color={category === cat.id ? "#fff" : "#6366F1"} 
                  />
                  <Text 
                    style={[
                      styles.categoryItemText,
                      category === cat.id && styles.selectedCategoryItemText
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description de la dépense"
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Justificatif (optionnel)</Text>
        <TouchableOpacity style={styles.fileUpload}>
          <Ionicons name="cloud-upload" size={24} color="#6366F1" />
          <Text style={styles.fileUploadText}>
            {receipt ? 'Fichier sélectionné' : 'Ajouter un fichier'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Ajouter la dépense</Text>
      </TouchableOpacity>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
  },
  selectedCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 8,
  },
  categoriesList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  selectedCategoryItem: {
    backgroundColor: '#6366F1',
  },
  categoryItemText: {
    marginLeft: 8,
    color: '#1E293B',
  },
  selectedCategoryItemText: {
    color: '#fff',
  },
  fileUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 8,
    borderStyle: 'dashed',
    padding: 16,
  },
  fileUploadText: {
    color: '#6366F1',
    marginLeft: 8,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
