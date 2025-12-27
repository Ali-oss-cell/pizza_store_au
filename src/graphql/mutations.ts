import { gql } from '@apollo/client'

// Auth Mutations
export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        username
        email
        role
        isAdmin
        isStaffMember
      }
      success
      message
      token
    }
  }
`

// Order Mutations
export const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation UpdateOrderStatus($input: UpdateOrderStatusInput!) {
    updateOrderStatus(input: $input) {
      order {
        id
        orderNumber
        status
        statusDisplay
      }
      success
      message
    }
  }
`

// Product Mutations
export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      product {
        id
        name
      }
      success
      message
    }
  }
`

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      product {
        id
        name
      }
      success
      message
    }
  }
`

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
      message
    }
  }
`

// Category Mutations
export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      category {
        id
        name
        slug
      }
      success
      message
    }
  }
`

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
      category {
        id
        name
      }
      success
      message
    }
  }
`

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      success
      message
    }
  }
`

// Tag Mutations
export const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($input: TagInput!) {
    createTag(input: $input) {
      tag {
        id
        name
        color
      }
      success
      message
    }
  }
`

export const UPDATE_TAG_MUTATION = gql`
  mutation UpdateTag($id: ID!, $input: TagInput!) {
    updateTag(id: $id, input: $input) {
      tag {
        id
        name
        color
      }
      success
      message
    }
  }
`

export const DELETE_TAG_MUTATION = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      success
      message
    }
  }
`

// Ingredient Mutations
export const CREATE_INGREDIENT_MUTATION = gql`
  mutation CreateIngredient($input: IngredientInput!) {
    createIngredient(input: $input) {
      ingredient {
        id
        name
        icon
      }
      success
      message
    }
  }
`

export const UPDATE_INGREDIENT_MUTATION = gql`
  mutation UpdateIngredient($id: ID!, $input: IngredientInput!) {
    updateIngredient(id: $id, input: $input) {
      ingredient {
        id
        name
        icon
      }
      success
      message
    }
  }
`

export const DELETE_INGREDIENT_MUTATION = gql`
  mutation DeleteIngredient($id: ID!) {
    deleteIngredient(id: $id) {
      success
      message
    }
  }
`

// Size Mutations
export const CREATE_SIZE_MUTATION = gql`
  mutation CreateSize($input: SizeInput!) {
    createSize(input: $input) {
      size {
        id
        name
        category
      }
      success
      message
    }
  }
`

export const UPDATE_SIZE_MUTATION = gql`
  mutation UpdateSize($id: ID!, $input: SizeInput!) {
    updateSize(id: $id, input: $input) {
      size {
        id
        name
      }
      success
      message
    }
  }
`

export const DELETE_SIZE_MUTATION = gql`
  mutation DeleteSize($id: ID!) {
    deleteSize(id: $id) {
      success
      message
    }
  }
`

// Topping Mutations
export const CREATE_TOPPING_MUTATION = gql`
  mutation CreateTopping($input: ToppingInput!) {
    createTopping(input: $input) {
      topping {
        id
        name
        price
      }
      success
      message
    }
  }
`

export const UPDATE_TOPPING_MUTATION = gql`
  mutation UpdateTopping($id: ID!, $input: ToppingInput!) {
    updateTopping(id: $id, input: $input) {
      topping {
        id
        name
        price
      }
      success
      message
    }
  }
`

export const DELETE_TOPPING_MUTATION = gql`
  mutation DeleteTopping($id: ID!) {
    deleteTopping(id: $id) {
      success
      message
    }
  }
`

// Included Item Mutations
export const CREATE_INCLUDED_ITEM_MUTATION = gql`
  mutation CreateIncludedItem($input: IncludedItemInput!) {
    createIncludedItem(input: $input) {
      includedItem {
        id
        name
      }
      success
      message
    }
  }
`

export const UPDATE_INCLUDED_ITEM_MUTATION = gql`
  mutation UpdateIncludedItem($id: ID!, $input: IncludedItemInput!) {
    updateIncludedItem(id: $id, input: $input) {
      includedItem {
        id
        name
      }
      success
      message
    }
  }
`

export const DELETE_INCLUDED_ITEM_MUTATION = gql`
  mutation DeleteIncludedItem($id: ID!) {
    deleteIncludedItem(id: $id) {
      success
      message
    }
  }
`

// Promotion Mutations
export const CREATE_PROMOTION_MUTATION = gql`
  mutation CreatePromotion($input: PromotionInput!) {
    createPromotion(input: $input) {
      promotion {
        id
        code
        name
      }
      success
      message
    }
  }
`

export const UPDATE_PROMOTION_MUTATION = gql`
  mutation UpdatePromotion($id: ID!, $input: PromotionInput!) {
    updatePromotion(id: $id, input: $input) {
      promotion {
        id
        code
      }
      success
      message
    }
  }
`

export const DELETE_PROMOTION_MUTATION = gql`
  mutation DeletePromotion($id: ID!) {
    deletePromotion(id: $id) {
      success
      message
    }
  }
`

// Settings Mutations
export const UPDATE_STORE_SETTINGS_MUTATION = gql`
  mutation UpdateStoreSettings($input: StoreSettingsInput!) {
    updateStoreSettings(input: $input) {
      settings {
        storeName
      }
      success
      message
    }
  }
`

// Team Mutations
export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        username
        email
        role
      }
      success
      message
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userId: ID, $email: String, $role: String, $isActive: Boolean) {
    updateUser(userId: $userId, email: $email, role: $role, isActive: $isActive) {
      user {
        id
        username
        email
        role
        isActive
      }
      success
      message
    }
  }
`

// Review Mutations
export const APPROVE_REVIEW_MUTATION = gql`
  mutation ApproveReview($id: ID!, $approve: Boolean!) {
    approveReview(id: $id, approve: $approve) {
      review {
        id
        isApproved
      }
      success
      message
    }
  }
`

export const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      success
      message
    }
  }
`

